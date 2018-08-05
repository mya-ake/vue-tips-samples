import path from 'path';

import build from './projects';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(__dirname, '..');
const VUEPRESS_PATH = path.join(ROOT, 'docs', '.vuepress');
const VUEPRESS_COMPONENTS_PATH = path.join(VUEPRESS_PATH, 'components');
const VUEPRESS_STORE_PATH = path.join(VUEPRESS_PATH, 'store');

/** execute */
const paths = {
  root: ROOT,
  vuepressPath: VUEPRESS_PATH,
  distComponentPathname: VUEPRESS_COMPONENTS_PATH,
  distStorePathname: VUEPRESS_STORE_PATH,
};

build(paths);
