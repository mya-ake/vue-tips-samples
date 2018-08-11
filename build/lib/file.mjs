'use strict';

import fs from 'fs';
import { join, dirname } from 'path';

export const existPathname = pathname => {
  try {
    fs.statSync(pathname);
    return true;
  } catch (err) {
    return false;
  }
};

export const createDir = pathname => {
  fs.mkdirSync(pathname);
};

const ensureWriteProcess = pathname => {
  const fileDirname = dirname(pathname);
  if (existPathname(fileDirname)) {
    return;
  }
  ensureWriteProcess(fileDirname);
  createDir(fileDirname);
};

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

export const readFile = pathname => {
  return fs.readFileSync(pathname, { encoding: 'utf8' });
};

export const extractFileName = pathname => {
  return pathname.split('/').pop();
};

export const writeFile = (pathname, data) => {
  ensureWriteProcess(pathname);
  return fs.writeFileSync(pathname, data, { encoding: 'utf8' });
};

export const copyFile = (pathname, distPathname) => {
  ensureWriteProcess(distPathname);
  fs.copyFileSync(pathname, distPathname);
};

export const copyFileWithReplacer = (
  pathname,
  distPathname,
  replacer = null,
) => {
  let data = readFile(pathname);

  if (typeof replacer === 'function') {
    data = replacer({
      code: data,
      pathname,
      fileName: extractFileName(pathname),
    });
  }

  writeFile(distPathname, data);
};
