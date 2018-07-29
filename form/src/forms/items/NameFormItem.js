import { BaseFormItem } from '@/lib';
import { isEmptyString, isExpectLength } from '@/helpers/validators';

export class NameFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);
    this.maxlength = 17;

    this._addValidators();
  }

  _addValidators() {
    this.addValidator({
      message: '入力が必須の項目です',
      validator: this._isEmptyValidator,
    });

    this.addValidator({
      message: '16文字以内で入力してください',
      validator: this._isExpectLengthValidator,
    });
  }

  _isEmptyValidator(value) {
    return isEmptyString(value) === false;
  }

  _isExpectLengthValidator(value) {
    return isExpectLength(value, { max: this.maxlength - 1 });
  }
}
