import { BaseForm } from "./BaseForm";
import {
  NameFormItem,
  EmailFormItem,
  TitleFormItem,
  BodyFormItem
} from "./items";

export class ContactForm extends BaseForm {
  constructor({ name = "", email = "", title = "", body = "" } = {}) {
    super();
    this.name = new NameFormItem(name);
    this.email = new EmailFormItem(email);
    this.title = new TitleFormItem(title);
    this.body = new BodyFormItem(body);
  }

  buildRequestBody() {
    return {
      contact: {
        ...this.properties()
      }
    };
  }
}
