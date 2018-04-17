import { BaseSelectFormItem } from "./BaseSelectFormItem";
import { isEmptyString } from "@/helpers/validators";

const MESSAGES = {
  EMPTY: "選択が必須の項目です",
  INVALID: "不正な操作が必要な行われました"
};

export class CategoryFormItem extends BaseSelectFormItem {
  constructor(value = "") {
    super(value);
    this.options = [
      {
        text: "サービスについて",
        value: "サービスについて"
      },
      {
        text: "採用について",
        value: "採用について"
      },
      {
        text: "その他（タイトルにご記入ください）",
        value: "その他（タイトルにご記入ください）"
      }
    ];
  }

  validator() {
    const messages = [];
    if (isEmptyString(this.value)) {
      messages.push(MESSAGES.EMPTY);
      return messages;
    }
    if (this.options.some(option => this.value === option.value) === false) {
      messages.push(MESSAGES.INVALID);
    }
    return messages;
  }
}

CategoryFormItem.MESSAGES = MESSAGES;
