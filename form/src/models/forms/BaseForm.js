import { BaseFormItem } from './items';

export class BaseForm {
  properties() {
    return Object.entries(this).reduce((properties, [key, value]) => {
      properties[key] = value instanceof BaseFormItem ? value.value : value;
      return properties;
    }, {});
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
