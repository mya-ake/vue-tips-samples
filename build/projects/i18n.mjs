import path from 'path';
import { copyFile } from './../lib/file';
import { copyFiles, buildComponents } from './../lib/builder';

export default ({ root, vuepressPath, distComponentPathname }) => {
  const PROJECT_SRC = path.join(root, 'i18n', 'src');
  const LOCALES_SRC_PATH = path.resolve(PROJECT_SRC, '..', 'public', 'locales');
  const LOCALES_DIST_PATH = path.join(vuepressPath, 'public', 'locales');
  const I18N_SRC_PATH = path.join(PROJECT_SRC, 'i18n.js');
  const I18n_DIST_PATH = path.join(vuepressPath, 'i18n.js');

  copyFile(I18N_SRC_PATH, I18n_DIST_PATH);
  copyFiles(LOCALES_SRC_PATH, LOCALES_DIST_PATH);

  const componentPrefix = 'I18n';
  buildComponents(PROJECT_SRC, distComponentPathname, {
    prefix: componentPrefix,
    componentsDirname: 'views',
  });
};
