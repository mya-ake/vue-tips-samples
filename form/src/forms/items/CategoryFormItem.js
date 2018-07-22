import { BaseSelectFormItem } from '@/lib';
import { isEmptyString } from '@/helpers/validators';

export class CategoryFormItem extends BaseSelectFormItem {
  constructor(value = '') {
    super(value);
    this.options = [
      {
        text: 'サービスについて',
        value: 'サービスについて',
      },
      {
        text: '採用について',
        value: '採用について',
      },
      {
        text: 'その他（タイトルにご記入ください）',
        value: 'その他（タイトルにご記入ください）',
      },
    ];

    this._addValidators();
  }

  _addValidators() {
    this.addValidator({
      message: '選択が必須の項目です',
      validator: this._isEmptyValidator,
      stop: true,
    });

    this.addValidator({
      message: '不正な操作が行われました',
      validator: this.valid,
    });
  }

  _isEmptyValidator(value) {
    return isEmptyString(value) === false;
  }
}
