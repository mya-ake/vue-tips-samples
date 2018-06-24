import { BaseForm } from './BaseForm';
import { PasswordFormItem } from './items';

export class PasswordUpdateForm extends BaseForm {
  constructor({ password = '', passwordConfirm = '' } = {}) {
    super();
    this.password = new PasswordFormItem(password);
    this.passwordConfirm = new PasswordFormItem(passwordConfirm);

    this._initialize();
  }

  update(name) {
    switch (name) {
      case 'password':
      case 'passwordConfirm':
        {
          const message = 'パスワードが一致しません';
          if (this.password.value !== this.passwordConfirm.value) {
            this.password.addMessage(message);
            this.passwordConfirm.addMessage(message);
          } else {
            this.password.removeMessage(message);
            this.passwordConfirm.removeMessage(message);
          }
        }
        break;
      default:
        break;
    }
  }

  buildRequestBody() {
    return {
      user: {
        ...this.properties(),
      },
    };
  }
}
