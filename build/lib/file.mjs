'use strict';

import fs from 'fs';
import { join } from 'path';

export const getFilePathList = folderPath => {
  const paths = fs.readdirSync(folderPath);
  return paths.reduce((newPaths, filePath) => {
    const absoluteFilePath = join(folderPath, filePath);
    if (fs.statSync(absoluteFilePath).isDirectory()) {
      return newPaths.concat(getFilePathList(absoluteFilePath));
    } else {
      return newPaths.concat(absoluteFilePath);
    }
  }, []);
};

export const readFile = path => {
  return fs.readFileSync(path, { encoding: 'utf8' });
};

export const extractFileName = path => {
  return path.split('/').pop();
};

export const writeFile = (path, data) => {
  return fs.writeFileSync(path, data, { encoding: 'utf8' });
};

export const existPathname = pathname => {
  try {
    fs.statSync(pathname);
    return true;
  } catch {
    return false;
  }
};
