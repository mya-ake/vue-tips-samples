import { BaseFormItem } from './BaseFormItem';

export class BaseSelectFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);
    this.options = [];
  }

  valid(value) {
    return this.options.some(option => value === option.value);
  }
}
