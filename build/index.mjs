import fs from 'fs';
import path from 'path';
import { buildStore, buildComponents } from './projects';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const ROOT = path.resolve(__dirname, '..');
const VUEPRESS_PATH = path.join(ROOT, 'docs', '.vuepress');
const VUEPRESS_COMPONENTS_PATH = path.join(VUEPRESS_PATH, 'components');
const VUEPRESS_STORE_PATH = path.join(VUEPRESS_PATH, 'store');

fs.mkdirSync(VUEPRESS_COMPONENTS_PATH);
fs.mkdirSync(VUEPRESS_STORE_PATH);

/** samples/modal_store */
const build = () => {
  const PROJECT_SRC = path.join(ROOT, 'samples', 'modal_store', 'src');
  buildStore(PROJECT_SRC, VUEPRESS_STORE_PATH);
  buildComponents(PROJECT_SRC, VUEPRESS_COMPONENTS_PATH);
};

build();
