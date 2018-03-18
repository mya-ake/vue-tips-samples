import { BaseFormItem } from "./BaseFormItem";
import { isEmptyString, isEmail } from "@/helpers/validators";

const MESSAGES = {
  EMPTY: "入力が必須の項目です",
  INVALID_EMAIL: "メールアドレスを入力してください"
};

export class EmailFormItem extends BaseFormItem {
  validator() {
    const messages = [];
    if (isEmptyString(this.value)) {
      messages.push(MESSAGES.EMPTY);
    }
    if (isEmail(this.value) === false) {
      messages.push(MESSAGES.INVALID_EMAIL);
    }
    return messages;
  }
}

EmailFormItem.MESSAGES = MESSAGES;
