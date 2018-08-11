import path from 'path';
import { copyFile } from './../lib/file';
import {
  splitImport,
  replaceImport,
  copyFiles,
  buildStore,
  buildComponents,
} from './../lib/builder';

const mixinReplacer = ({ code }) => {
  return code.replace(`from '@/lib'`, `from './../lib/BaseFormItem'`);
};

const formsReplacer = ({ code, fileName }) => {
  const items = splitImport(code, './items');
  if (items !== null) {
    const importString = items
      .map(item => `import { ${item} } from './items/${item}'`)
      .join('\n');
    code = replaceImport(code, './items', importString);
  }
  if (fileName === 'ContactForm.js') {
    code = code.replace(
      `from '@/helpers/validators'`,
      `from './../helpers/validators'`,
    );
  }
  if (/Form\.js$/.test(fileName)) {
    code = code.replace(
      `import { BaseForm } from '@/lib'`,
      `import { BaseForm } from './../lib/BaseForm'`,
    );
  }
  if (/FormItem\.js$/.test(fileName)) {
    code = code
      .replace(
        `from '@/helpers/validators'`,
        `from './../../helpers/validators'`,
      )
      .replace(
        `import { BaseFormItem } from '@/lib'`,
        `import { BaseFormItem } from './../../lib/BaseFormItem'`,
      );
  }
  if (fileName === 'CategoryFormItem.js') {
    code = code.replace(
      `import { BaseSelectFormItem } from '@/lib'`,
      `import { BaseSelectFormItem } from './../../lib/BaseSelectFormItem'`,
    );
  }

  return code;
};

const componentReplacer = ({ code }) => {
  return code
    .replace(
      `import { formItemMixin } from '@/mixins';`,
      `import { formItemMixin } from './../mixins/form-item';`,
    )
    .replace(
      `import { BaseSelectFormItem } from '@/lib';`,
      `import { BaseSelectFormItem } from './../lib/BaseSelectFormItem';`,
    );
};

const viewComponentReplacer = ({ code, fileName }) => {
  if (fileName === 'Form.vue') {
    code = code.replace(
      `this.$router.push('/confirm')`,
      `this.$router.push('/demo/form/confirm/')`,
    );
  }
  if (fileName === 'Confirm.vue') {
    code = code.replace(
      `this.$router.push('/complete')`,
      `this.$router.push('/demo/form/complete/')`,
    );
  }
  if (fileName === 'Complete.vue') {
    code = code.replace(
      `if (from.path !== '/confirm')`,
      `if (from.path !== '/demo/form/confirm/')`,
    );
  }
  return code
    .replace(
      `import { ContactForm } from '@/forms'`,
      `import { ContactForm } from './../forms/ContactForm'`,
    )
    .replace(`next('/form')`, `next('/demo/form/')`)
    .replace(`to="/form"`, `to="/demo/form/"`);
};

export default ({
  root,
  vuepressPath,
  distComponentPathname,
  distStorePathname,
}) => {
  const PROJECT_SRC = path.join(root, 'form', 'src');
  const MIXINS_SRC = path.join(PROJECT_SRC, 'mixins');
  const MIXINS_DIST = path.join(vuepressPath, 'mixins');
  const LIB_SRC = path.join(PROJECT_SRC, 'lib');
  const LIB_DIST = path.join(vuepressPath, 'lib');
  const FORMS_SRC = path.join(PROJECT_SRC, 'forms');
  const FORMS_DIST = path.join(vuepressPath, 'forms');
  const VALIDATORS_SRC = path.join(PROJECT_SRC, 'helpers', 'validators.js');
  const VALIDATORS_DIST = path.join(vuepressPath, 'helpers', 'validators.js');

  const componentPrefix = 'Contact';
  buildComponents(PROJECT_SRC, distComponentPathname, {
    prefix: componentPrefix,
    replacer: componentReplacer,
  });
  buildComponents(PROJECT_SRC, distComponentPathname, {
    prefix: componentPrefix,
    componentsDirname: 'views',
    exclude: ['PasswordUpdate.vue', 'SampleValidationAttribute.vue'],
    replacer: viewComponentReplacer,
  });
  buildStore(PROJECT_SRC, distStorePathname);

  copyFiles(MIXINS_SRC, MIXINS_DIST, {
    exclude: ['index.js'],
    replacer: mixinReplacer,
  });

  copyFiles(LIB_SRC, LIB_DIST, {
    exclude: ['index.js'],
  });

  copyFiles(FORMS_SRC, FORMS_DIST, {
    exclude: ['index.js'],
    replacer: formsReplacer,
  });

  copyFile(VALIDATORS_SRC, VALIDATORS_DIST);
};
