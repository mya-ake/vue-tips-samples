import { BaseFormItem } from './BaseFormItem';
import { isEmptyString, isExpectLength } from '@/helpers/validators';

const MESSAGES = {
  EMPTY: '入力が必須の項目です',
  EXPECT_LENGTH: '8~64文字で入力してください',
};

export class PasswordFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);
    this._value = value;
    this._messages = [];
    this.minlength = 8;
    this.maxlength = 65;
  }

  validator() {
    const messages = [].concat(this._messages);
    if (isEmptyString(this.value)) {
      messages.push(MESSAGES.EMPTY);
    }
    if (
      isExpectLength(this.value, {
        min: this.minlength,
        max: this.maxlength - 1,
      }) === false
    ) {
      messages.push(MESSAGES.EXPECT_LENGTH);
    }
    return messages;
  }
}

PasswordFormItem.MESSAGES = MESSAGES;
