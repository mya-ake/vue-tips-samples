import { BaseSelectFormItem } from "./BaseSelectFormItem";
import { isEmptyString } from "@/helpers/validators";

const MESSAGES = {
  EMPTY: "選択してください",
  INVALID: "不正な操作が必要な行われました"
};

export class CategoryFormItem extends BaseSelectFormItem {
  constructor(value) {
    super(value);
    this.options = [
      "サービスについて",
      "採用について",
      "その他（タイトルにご記入ください）"
    ];
  }

  validator() {
    const messages = [];
    if (isEmptyString(this.value)) {
      messages.push(MESSAGES.EMPTY);
      return messages;
    }
    if (this.options.includes(this.value) === false) {
      messages.push(MESSAGES.INVALID);
    }
    return messages;
  }
}

CategoryFormItem.MESSAGES = MESSAGES;
