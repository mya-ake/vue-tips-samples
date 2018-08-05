import path from 'path';

import {
  getFilePathList,
  extractFileName,
  readFile,
  writeFile,
} from './../lib/file';

export const buildStore = (projectPathname, distPathname) => {
  const storePathname = path.join(projectPathname, 'store');
  const pathList = getFilePathList(storePathname);
  for (const pathname of pathList) {
    const fileName = extractFileName(pathname);
    if (fileName === 'index.js') {
      continue;
    }

    const storeCode = readFile(pathname).replace('@/', `${projectPathname}/`);
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

export const buildComponents = (projectPathname, distPathname) => {
  const componentsPathname = path.join(projectPathname, 'components');
  const pathList = getFilePathList(componentsPathname);
  for (const pathname of pathList) {
    const fileName = extractFileName(pathname);
    if (fileName === 'index.js') {
      continue;
    }

    let componentsCode = readFile(pathname);

    // import components
    const importComponents = extractImportComponents(componentsCode);
    if (importComponents !== null) {
      const imposrtString = importComponents
        .map(code => `import ${code} from './${code}'`)
        .join('\n');
      componentsCode = componentsCode.replace(
        /import { ([a-zA-Z\s,]*) } from ['"]@\/components['"]/,
        imposrtString,
      );
    }

    // import store
    componentsCode = componentsCode.replace('@/store/', './../store/');

    const distFilename = path.join(distPathname, fileName);
    writeFile(distFilename, componentsCode);
  }
};
