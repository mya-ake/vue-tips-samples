import { BaseForm } from '@/lib';
import {
  NameFormItem,
  EmailFormItem,
  CategoryFormItem,
  TitleFormItem,
  BodyFormItem,
} from './items';
import { isEmptyString } from '@/helpers/validators';

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

    this._addRelationshipValidator();
  }

  _addRelationshipValidator() {
    this._addTitleValidatorByCategoryOther();
  }

  _addTitleValidatorByCategoryOther() {
    const message = 'カテゴリ「その他」を選択された方はご入力ください';

    const categoryOtherValue = this.items.category.options[
      this.items.category.options.length - 1
    ].value;

    this.items.category.addValueObserver(value => {
      if (value === categoryOtherValue) {
        this.items.title.addValidator({
          message,
          validator: this._isEmptyValidator,
        });
        this.items.title.validate();
      } else {
        this.items.title.removeValidator({ message });
      }
    });
  }

  _isEmptyValidator(value) {
    return isEmptyString(value) === false;
  }

  buildRequestBody() {
    return {
      contact: {
        ...this.values(),
      },
    };
  }
}
