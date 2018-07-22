import { BaseForm } from '@/lib';
import { EmailFormItem } from './items';

export class SampleForm extends BaseForm {
  constructor({
    email = '',
    emailDirty = '',
    emailTouched = '',
    emailTouechAndDirty = '',
    emailTouchedAfterDirty = '',
  } = {}) {
    super();
    this.addItem('email', new EmailFormItem(email));
    this.addItem('emailDirty', new EmailFormItem(emailDirty));
    this.addItem('emailTouched', new EmailFormItem(emailTouched));
    this.addItem('emailTouechAndDirty', new EmailFormItem(emailTouechAndDirty));
    this.addItem(
      'emailTouchedAfterDirty',
      new EmailFormItem(emailTouchedAfterDirty),
    );
  }
}
