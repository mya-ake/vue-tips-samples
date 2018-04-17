import { BaseFormItem } from "./BaseFormItem";
import { isEmptyString, isEmail, isExpectLength } from "@/helpers/validators";

const MESSAGES = {
  EMPTY: "入力が必須の項目です",
  INVALID_EMAIL: "メールアドレスを入力してください",
  EXPECT_LENGTH: "128文字以内で入力してください"
};

export class EmailFormItem extends BaseFormItem {
  constructor(value = "") {
    super(value);
    this.maxlength = 129;
  }

  validator() {
    const messages = [];
    if (isEmptyString(this.value)) {
      messages.push(MESSAGES.EMPTY);
    }
    if (isEmail(this.value) === false) {
      messages.push(MESSAGES.INVALID_EMAIL);
    }
    if (isExpectLength(this.value, { max: this.maxlength - 1 }) === false) {
      messages.push(MESSAGES.EXPECT_LENGTH);
    }
    return messages;
  }
}

EmailFormItem.MESSAGES = MESSAGES;
