const MESSAGES = {};

export class BaseFormItem {
  constructor(value = '') {
    this.value = value;
  }

  validator() {
    return [];
  }
}

BaseFormItem.MESSAGES = MESSAGES;
