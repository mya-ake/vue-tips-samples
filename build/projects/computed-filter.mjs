import path from 'path';
import { buildComponents } from './../lib/builder';

export default ({ root, distComponentPathname }) => {
  const PROJECT_SRC = path.join(root, 'computed_filter', 'src');
  buildComponents(PROJECT_SRC, distComponentPathname);
};
