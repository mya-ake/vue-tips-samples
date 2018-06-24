const MESSAGES = {};

export class BaseFormItem {
  constructor(value = '') {
    this._value = value;
    this.value = value;
    this._messages = [];
  }

  validator() {
    return [];
  }

  get messages() {
    return this._messages;
  }

  addMessage(message) {
    if (this._messages.includes(message)) {
      return;
    }
    this._messages.push(message);
  }

  removeMessage(message) {
    const index = this._messages.findIndex(_message => message === _message);
    if (index === -1) {
      return;
    }
    this._messages.splice(index, 1);
  }
}

BaseFormItem.MESSAGES = MESSAGES;
