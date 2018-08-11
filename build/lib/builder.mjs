import path from 'path';

import {
  getFilePathList,
  extractFileName,
  readFile,
  writeFile,
  copyFile,
  copyFileWithReplacer,
} from './../lib/file';

const buildImportRegExp = from =>
  new RegExp(`import {([^{^}]*)} from ['"]${from}['"]`);

const extractTargetPathname = (pathname, srcPattname) => {
  return pathname.replace(srcPattname, '');
};

const camelToHyphen = str => {
  return str.replace(/[A-Z]/g, (match, offset) => {
    return offset === 0 ? match.toLowerCase() : `-${match.toLowerCase()}`;
  });
};

export const copyFiles = (
  srcPathname,
  distDirPathname,
  { exclude = [], replacer = null } = {},
) => {
  const pathList = getFilePathList(srcPathname);
  for (const pathname of pathList) {
    const fileName = extractFileName(pathname);
    if (exclude.includes(fileName)) {
      continue;
    }

    const targetPathname = extractTargetPathname(pathname, srcPathname);
    const distPathname = path.join(distDirPathname, targetPathname);
    if (typeof replacer === 'function') {
      copyFileWithReplacer(pathname, distPathname, replacer);
    } else {
      copyFile(pathname, distPathname);
    }
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

export const splitImport = (code, from) => {
  const importCode = code.match(buildImportRegExp(from));
  return importCode === null
    ? null
    : importCode[1]
        .split(/[\s,\n]+/)
        .filter(moduleName => moduleName.length > 0);
};

export const replaceImport = (code = '', from, replaceValue) => {
  return code.replace(buildImportRegExp(from), replaceValue);
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

    if (typeof replacer === 'function') {
      componentsCode = replacer({
        code: componentsCode,
        pathname,
        fileName,
      });
    }

    // import components
    const importComponents = splitImport(componentsCode, '@/components');
    if (importComponents !== null) {
      const importString = importComponents
        .map(compoent => `${prefix}${compoent}`)
        .map(compoent => `import ${compoent} from './${compoent}'`)
        .join('\n');
      componentsCode = replaceImport(
        componentsCode,
        '@/components',
        importString,
      );

      // components property
      for (const importComponent of importComponents) {
        const prefixComponentName = `${prefix}${importComponent}`;
        componentsCode = componentsCode.replace(
          new RegExp(`${importComponent},`),
          `${prefixComponentName},`,
        );

        const customTag = camelToHyphen(importComponent);
        const prefixCustomTag = camelToHyphen(prefixComponentName);
        componentsCode = componentsCode.replace(
          new RegExp(customTag, 'g'),
          prefixCustomTag,
        );
      }
    }

    // replace import
    componentsCode = componentsCode
      .replace('@/store/', './../store/')
      .replace('@/store', './../store')
      .replace('@/', `${projectPathname}/`);

    const distFilename = path.join(distPathname, `${prefix}${fileName}`);
    writeFile(distFilename, componentsCode);
  }
};
