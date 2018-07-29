import { BaseFormItem } from './BaseFormItem';

export class BaseForm {
  constructor() {
    this.invalid = false;
    this.items = {};
    return this;
  }

  addItem(name, item) {
    if (item instanceof BaseFormItem === false) {
      throw new Error(
        '[BaseForm] Item must be an instance of the extended BaseFormItem class',
      );
    }
    this.items[name] = item;
    this.items[name].addStateObserver(invalid => {
      this._updateState(invalid);
    });
    this.updateState();
    return this;
  }

  addRelationshipValidator({ names, validator, message }) {
    names.filter(name => name in this.items === false).forEach(name => {
      throw new Error(`[BaseForm] ${name} is not set item`);
    });
    names.forEach(name => {
      this.items[name].addValueObserver(() => {
        if (validator.call(this)) {
          this._removeMessages(names, message);
        } else {
          this._addMessages(names, message);
        }
      });
    });
    return this;
  }

  _addMessages(names, message) {
    names.forEach(name => {
      this.items[name].addMessage(message);
    });
  }

  _removeMessages(names, message) {
    names.forEach(name => {
      this.items[name].removeMessage(message);
    });
  }

  setValues(newValues) {
    Object.entries(newValues).forEach(([name, value]) => {
      this.items[name].value = value;
    });
  }

  values() {
    return Object.entries(this.items).reduce((values, [name, item]) => {
      values[name] = item.value;
      return values;
    }, {});
  }

  updateState() {
    this.invalid = this._invalidResults();
    return this;
  }

  _updateState(invalid) {
    if (invalid === false) {
      this.invalid = this._invalidResults();
    } else {
      this.invalid = true;
    }
  }

  _invalidResults() {
    return Object.keys(this.items).some(name => this.items[name].invalid);
  }
}
