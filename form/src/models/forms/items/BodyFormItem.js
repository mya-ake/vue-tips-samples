import { BaseFormItem } from "./BaseFormItem";
import { isEmptyString, isExpectLength } from "@/helpers/validators";

const MESSAGES = {
  EMPTY: "入力が必須の項目です",
  EXPECT_LENGTH: "500文字以内で入力してください"
};

export class BodyFormItem extends BaseFormItem {
  validator() {
    const messages = [];
    if (isEmptyString(this.value)) {
      messages.push(MESSAGES.EMPTY);
    }
    if (isExpectLength(this.value, { max: 500 }) === false) {
      messages.push(MESSAGES.EXPECT_LENGTH);
    }
    return messages;
  }
}

BodyFormItem.MESSAGES = MESSAGES;
