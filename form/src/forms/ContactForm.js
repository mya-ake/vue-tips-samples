import { BaseForm } from '@/lib';
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
    this.addItem('name', new NameFormItem(name).validate());
    this.addItem('email', new EmailFormItem(email).validate());
    this.addItem('category', new CategoryFormItem(category).validate());
    this.addItem('title', new TitleFormItem(title).validate());
    this.addItem('body', new BodyFormItem(body).validate());
  }

  buildRequestBody() {
    return {
      contact: {
        ...this.values(),
      },
    };
  }
}
