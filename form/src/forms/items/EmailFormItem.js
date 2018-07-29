import { BaseFormItem } from '@/lib';
import { isEmptyString, isEmail, isExpectLength } from '@/helpers/validators';

export class EmailFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);
    this.maxlength = 129;

    this._addValidators();
  }

  _addValidators() {
    this.addValidator({
      message: '入力が必須の項目です',
      validator: this._isEmptyValidator,
      stop: true,
    });

    this.addValidator({
      message: 'メールアドレスを入力してください',
      validator: this._isEmailValidator,
    });

    this.addValidator({
      message: `${this.maxlength - 1}文字以内で入力してください`,
      validator: this._isExpectLengthValidator,
    });
  }

  _isEmptyValidator(value) {
    return isEmptyString(value) === false;
  }

  _isEmailValidator(value) {
    return isEmail(value);
  }

  _isExpectLengthValidator(value) {
    return isExpectLength(value, {
      max: this.maxlength - 1,
    });
  }
}
