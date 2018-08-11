import path from 'path';
import { copyFiles, buildStore, buildComponents } from './../lib/builder';

const replaceRouterLinkTo = ({ code }) => {
  return code.replace(
    /<router-link to="\//g,
    '<router-link to="/demo/vuex_transition_problem/',
  );
};

export default ({
  root,
  vuepressPath,
  distStorePathname,
  distComponentPathname,
}) => {
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

  const componentPrefix = 'VuexTransition';
  buildComponents(PROJECT_SRC, distComponentPathname, {
    prefix: componentPrefix,
    componentsDirname: 'views',
    replacer: replaceRouterLinkTo,
  });
  buildComponents(PROJECT_SRC, distComponentPathname, {
    prefix: `${componentPrefix}Layout`,
    componentsDirname: 'layouts',
    replacer: replaceRouterLinkTo,
  });
};
