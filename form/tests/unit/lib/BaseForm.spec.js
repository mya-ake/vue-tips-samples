import { BaseForm, BaseFormItem } from '@/lib';

class TestFormItem extends BaseFormItem {
  constructor(value) {
    super(value);

    this._addValidators();
  }

  _addValidators() {
    this.addValidator({
      validator(value) {
        return value.length > 0;
      },
      message: 'empty',
    });
  }
}

describe('BaseForm', () => {
  describe('items', () => {
    let baseForm;
    beforeEach(() => {
      baseForm = new BaseForm();
    });

    it('add', () => {
      baseForm.addItem('test', new TestFormItem());
      expect(baseForm.items.test).toBeInstanceOf(TestFormItem);
    });

    it('throw error, BaseFormのインスタンスじゃない場合はエラーを投げる', () => {
      expect(() => {
        baseForm.addItem('test', {});
      }).toThrow();
    });
  });

  describe('relationship validation', () => {
    let baseForm;
    const message = 'mismatch';
    beforeEach(() => {
      baseForm = new BaseForm();
      baseForm.addItem('test1', new TestFormItem());
      baseForm.addItem('test2', new TestFormItem());
      baseForm.addRelationshipValidator({
        message,
        names: ['test1', 'test2'],
        validator() {
          return this.items.test1.value === this.items.test2.value;
        },
      });
    });

    it('add', () => {
      expect.assertions(2);
      expect(baseForm.items.test1._valueObservers).toHaveLength(1);
      expect(baseForm.items.test2._valueObservers).toHaveLength(1);
    });

    it('throw error, 登録されてないitemの場合はエラーを投げる', () => {
      expect(() => {
        baseForm.addRelationshipValidator({
          message,
          names: ['test1', 'test2', 'test3'],
          validator() {
            return true;
          },
        });
      }).toThrow();
    });

    it('runs validation', () => {
      baseForm.items.test1.value = 'a';

      expect.assertions(2);
      expect(baseForm.items.test1.messages).toEqual([message]);
      expect(baseForm.items.test2.messages).toEqual([message]);
    });
  });

  describe('state', () => {
    let baseForm;
    beforeEach(() => {
      baseForm = new BaseForm();
    });

    it('invalid, true', () => {
      baseForm.addItem('test', new TestFormItem());
      baseForm.items.test.validate();
      expect(baseForm.invalid).toBe(true);
    });

    it('invalid, false', () => {
      baseForm.addItem('test', new TestFormItem('a'));
      baseForm.items.test.validate();
      expect(baseForm.invalid).toBe(false);
    });
  });

  describe('setValues', () => {
    it('sets correctly', () => {
      const baseForm = new BaseForm();
      baseForm.addItem('test', new TestFormItem());
      baseForm.setValues({
        test: 'test',
      });
      expect(baseForm.items.test.value).toBe('test');
    });

    it('runs validate', () => {
      const baseForm = new BaseForm();
      baseForm.addItem('test', new TestFormItem('test'));
      baseForm.setValues({
        test: '',
      });
      expect(baseForm.invalid).toBe(true);
    });
  });

  describe('values', () => {
    it('', () => {
      const baseForm = new BaseForm();
      baseForm.addItem('test', new TestFormItem());
      expect(baseForm.values()).toEqual({
        test: '',
      });
    });
  });
});
