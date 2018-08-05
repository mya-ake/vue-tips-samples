import path from 'path';
import { copyFiles, buildStore } from './../lib/builder';

export default ({ root, vuepressPath, distStorePathname }) => {
  const PROJECT_SRC = path.join(
    root,
    'samples',
    'vuex_transition_problem',
    'src',
  );
  const API_SRC_PATH = path.resolve(PROJECT_SRC, '..', 'public', 'api');
  const API_DIST_PATH = path.join(vuepressPath, 'public', 'api');

  copyFiles(API_SRC_PATH, API_DIST_PATH);
  buildStore(PROJECT_SRC, distStorePathname);
};
