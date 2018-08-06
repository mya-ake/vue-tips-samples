import path from 'path';

import {
  getFilePathList,
  extractFileName,
  readFile,
  writeFile,
  copyFile,
} from './../lib/file';

const extractTargetPathname = (pathname, srcPattname) => {
  return pathname.replace(srcPattname, '');
};

export const copyFiles = (srcPathname, distDirPathname) => {
  const pathList = getFilePathList(srcPathname);
  for (const pathname of pathList) {
    const targetPathname = extractTargetPathname(pathname, srcPathname);
    const distPathname = path.join(distDirPathname, targetPathname);
    copyFile(pathname, distPathname);
  }
};

export const buildStore = (projectPathname, distPathname) => {
  const storePathname = path.join(projectPathname, 'store');
  const pathList = getFilePathList(storePathname);
  for (const pathname of pathList) {
    const fileName = extractFileName(pathname);
    if (fileName === 'index.js') {
      continue;
    }

    const storeCode = readFile(pathname).replace(/@\//g, `${projectPathname}/`);
    const distFilePathname = path.join(distPathname, fileName);
    writeFile(distFilePathname, storeCode);
  }
};

const extractImportComponents = componentsCode => {
  const importCode = componentsCode.match(
    /import { ([a-zA-Z\s,]*) } from ['"]@\/components['"]/,
  );
  return importCode === null ? null : importCode[1].split(/[\s,]+/);
};

export const buildComponents = (
  projectPathname,
  distPathname,
  {
    prefix = '',
    exclude = [],
    componentsDirname = 'components',
    replacer = null,
  } = {},
) => {
  const componentsPathname = path.join(projectPathname, componentsDirname);
  const pathList = getFilePathList(componentsPathname);
  for (const pathname of pathList) {
    const fileName = extractFileName(pathname);
    if (fileName === 'index.js') {
      continue;
    }
    if (exclude.includes(fileName)) {
      continue;
    }

    let componentsCode = readFile(pathname);

    // import components
    const importComponents = extractImportComponents(componentsCode);
    if (importComponents !== null) {
      const imposrtString = importComponents
        .map(compoent => `${prefix}${compoent}`)
        .map(compoent => `import ${compoent} from './${compoent}'`)
        .join('\n');
      componentsCode = componentsCode.replace(
        /import { ([a-zA-Z\s,]*) } from ['"]@\/components['"]/,
        imposrtString,
      );
    }

    // replace import
    componentsCode = componentsCode
      .replace('@/store/', './../store/')
      .replace('@/store', './../store')
      .replace('@/', `${projectPathname}/`);

    if (typeof replacer === 'function') {
      componentsCode = replacer(componentsCode);
    }

    const distFilename = path.join(distPathname, `${prefix}${fileName}`);
    writeFile(distFilename, componentsCode);
  }
};
