import { BaseFormItem } from '@/lib';
import { isEmptyString, isExpectLength } from '@/helpers/validators';

export class BodyFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);
    this.maxlength = 501;

    this._addValidators();
  }

  _addValidators() {
    this.addValidator({
      message: '入力が必須の項目です',
      validator: this._isEmptyValidator,
      stop: true,
    });

    this.addValidator({
      message: `${this.maxlength - 1}文字以内で入力してください`,
      validator: this._isExpectLengthValidator,
    });
  }

  _isEmptyValidator(value) {
    return isEmptyString(value) === false;
  }

  _isExpectLengthValidator(value) {
    return isExpectLength(value, {
      max: this.maxlength - 1,
    });
  }
}
