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
    this.email = new EmailFormItem(email);
    this.emailDirty = new EmailFormItem(emailDirty);
    this.emailTouched = new EmailFormItem(emailTouched);
    this.emailTouechAndDirty = new EmailFormItem(emailTouechAndDirty);
    this.emailTouchedAfterDirty = new EmailFormItem(emailTouchedAfterDirty);
  }
}
