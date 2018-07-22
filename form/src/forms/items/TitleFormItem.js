import { BaseFormItem } from '@/lib';
import { isExpectLength } from '@/helpers/validators';

const MESSAGES = {
  EXPECT_LENGTH: '32文字以内で入力してください',
};

export class TitleFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);
    this.maxlength = 33;

    this._addValidators();
  }

  _addValidators() {
    this.addValidator({
      message: `${this.maxlength - 1}文字以内で入力してください`,
      validator: this._isExpectLengthValidator,
    });
  }

  _isExpectLengthValidator(value) {
    return isExpectLength(value, {
      max: this.maxlength - 1,
    });
  }
}

TitleFormItem.MESSAGES = MESSAGES;
