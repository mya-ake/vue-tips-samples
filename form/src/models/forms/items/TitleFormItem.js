import { BaseFormItem } from './BaseFormItem';
import { isExpectLength } from '@/helpers/validators';

const MESSAGES = {
  EXPECT_LENGTH: '32文字以内で入力してください',
};

export class TitleFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);
    this.maxlength = 33;
  }

  validator() {
    const messages = [];
    if (isExpectLength(this.value, { max: this.maxlength - 1 }) === false) {
      messages.push(MESSAGES.EXPECT_LENGTH);
    }
    return messages;
  }
}

TitleFormItem.MESSAGES = MESSAGES;
