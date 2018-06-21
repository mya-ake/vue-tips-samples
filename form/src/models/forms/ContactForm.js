import { BaseForm } from './BaseForm';
import {
  NameFormItem,
  EmailFormItem,
  CategoryFormItem,
  TitleFormItem,
  BodyFormItem,
} from './items';

export class ContactForm extends BaseForm {
  constructor({
    name = '',
    email = '',
    category = '',
    title = '',
    body = '',
  } = {}) {
    super();
    this.name = new NameFormItem(name);
    this.email = new EmailFormItem(email);
    this.category = new CategoryFormItem(category);
    this.title = new TitleFormItem(title);
    this.body = new BodyFormItem(body);
  }

  buildRequestBody() {
    return {
      contact: {
        ...this.properties(),
      },
    };
  }
}
