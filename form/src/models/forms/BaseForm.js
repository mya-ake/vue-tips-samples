import { BaseFormItem } from './items';

export class BaseForm {
  properties() {
    return Object.entries(this).reduce((properties, [key, value]) => {
      properties[key] = value instanceof BaseFormItem ? value.value : value;
      return properties;
    }, {});
  }

  _initialize() {
    const update = name => {
      this.update.call(this, name);
    };
    this.propertyNames()
      .filter(name => {
        return /^_/.test(name) === false;
      })
      .forEach(name => {
        this[name] = Object.defineProperty(this[name], 'value', {
          get() {
            return this._value;
          },
          set(value) {
            this._value = value;
            update(name);
          },
        });
      });
  }

  update(name) {
    switch (name) {
      default:
        break;
    }
  }

  propertyNames() {
    return Object.keys(this);
  }

  buildRequestBody() {
    return {
      ...this.properties(),
    };
  }
}
