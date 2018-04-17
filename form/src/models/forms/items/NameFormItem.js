import { BaseFormItem } from "./BaseFormItem";
import { isEmptyString, isExpectLength } from "@/helpers/validators";

const MESSAGES = {
  EMPTY: "入力が必須の項目です",
  EXPECT_LENGTH: "16文字以内で入力してください"
};

export class NameFormItem extends BaseFormItem {
  constructor(value = "") {
    super(value);
    this.maxlength = 17;
  }

  validator() {
    const messages = [];
    if (isEmptyString(this.value)) {
      messages.push(MESSAGES.EMPTY);
    }
    if (isExpectLength(this.value, { max: this.maxlength - 1 }) === false) {
      messages.push(MESSAGES.EXPECT_LENGTH);
    }
    return messages;
  }
}

NameFormItem.MESSAGES = MESSAGES;
