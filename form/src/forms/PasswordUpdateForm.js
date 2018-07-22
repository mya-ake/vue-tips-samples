import { BaseForm } from '@/lib';
import { PasswordFormItem } from './items';

export class PasswordUpdateForm extends BaseForm {
  constructor({ password = '', passwordConfirm = '' } = {}) {
    super();
    this.addItem('password', new PasswordFormItem(password).validate());
    this.addItem(
      'passwordConfirm',
      new PasswordFormItem(passwordConfirm).validate(),
    );

    this._addRelationshipValidator();
  }

  _addRelationshipValidator() {
    this.addRelationshipValidator({
      message: 'パスワードが一致しません',
      names: ['password', 'passwordConfirm'],
      validator: this._matchPassword,
    });
  }

  _matchPassword() {
    if (this.items.password.states.dirty === false) {
      return true;
    }
    if (this.items.passwordConfirm.states.dirty === false) {
      return true;
    }
    return this.items.password.value === this.items.passwordConfirm.value;
  }

  buildRequestBody() {
    return {
      user: {
        ...this.values(),
      },
    };
  }
}
