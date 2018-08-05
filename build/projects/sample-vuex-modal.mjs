import path from 'path';
import { buildStore, buildComponents } from './../lib/builder';

export default ({ root, distComponentPathname, distStorePathname }) => {
  const PROJECT_SRC = path.join(root, 'samples', 'modal_store', 'src');
  buildComponents(PROJECT_SRC, distComponentPathname);
  buildStore(PROJECT_SRC, distStorePathname);
};
