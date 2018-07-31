import { BaseFormItem } from '@/lib';

describe('BaseFormItem', () => {
  describe('constructor', () => {
    it('sets default value', () => {
      const baseFormItem = new BaseFormItem();
      expect(baseFormItem.value).toBe('');
    });

    it('available value observer', () => {
      const baseFormItem = new BaseFormItem('a');
      expect(baseFormItem.value).toBe('a');
    });
  });

  describe('messages, invalid', () => {
    let baseFormItem;
    beforeEach(() => {
      baseFormItem = new BaseFormItem();
    });

    it('add', () => {
      baseFormItem.addMessage('test');
      expect(baseFormItem.messages).toContain('test');
    });

    it('remove', () => {
      baseFormItem.addMessage('test');
      baseFormItem.removeMessage('test');
      expect(baseFormItem.messages).not.toContain('test');
    });

    it('invalid', () => {
      baseFormItem.addMessage('test');
      expect(baseFormItem.invalid).toBe(true);
    });

    it('valid', () => {
      expect(baseFormItem.invalid).toBe(false);
    });
  });

  describe('states', () => {
    let baseFormItem;
    beforeEach(() => {
      baseFormItem = new BaseFormItem();
    });

    it('initial', () => {
      expect(baseFormItem.states).toEqual({
        dirty: false,
      });
    });

    it('dirty', () => {
      baseFormItem.value = 'a';
      expect(baseFormItem.states.dirty).toBe(true);
    });

    it('reset', () => {
      baseFormItem.value = 'a';
      baseFormItem.resetStates();
      expect(baseFormItem.states.dirty).toBe(false);
    });
  });

  describe('validator', () => {
    let baseFormItem;
    beforeEach(() => {
      baseFormItem = new BaseFormItem();
    });

    it('add validator', () => {
      baseFormItem.addValidator({
        validator() {},
        message: 'test',
      });
      expect(baseFormItem._validators).toHaveLength(1);
    });

    it('remove validator', () => {
      baseFormItem.addValidator({
        validator() {},
        message: 'test',
      });
      baseFormItem.removeValidator({
        message: 'test',
      });
      expect(baseFormItem._validators).toHaveLength(0);
    });

    it('validate, called', () => {
      const mockFunc = jest.fn();
      baseFormItem.addValidator({
        validator: mockFunc,
        message: 'test',
      });
      baseFormItem.value = 'a';

      expect.assertions(2);
      expect(mockFunc.mock.calls).toHaveLength(1);
      expect(mockFunc.mock.calls[0][0]).toBe('a');
    });

    it('validate, add message', () => {
      baseFormItem.addValidator({
        validator(value) {
          return value.length > 0;
        },
        message: 'empty',
      });

      baseFormItem.value = '';

      expect(baseFormItem.messages).toContain('empty');
    });

    it('validate, remove message', () => {
      baseFormItem.addValidator({
        validator(value) {
          return value.length > 0;
        },
        message: 'empty',
      });

      expect.assertions(2);

      baseFormItem.value = '';
      expect(baseFormItem.messages).toContain('empty');

      baseFormItem.value = 'a';
      expect(baseFormItem.messages).not.toContain('empty');
    });
  });

  describe('value observer', () => {
    let baseFormItem;
    beforeEach(() => {
      baseFormItem = new BaseFormItem();
    });

    it('called', () => {
      const mockFunc = jest.fn();
      baseFormItem.addValueObserver(mockFunc);

      baseFormItem.value = 'a';

      expect.assertions(2);
      expect(mockFunc.mock.calls).toHaveLength(1);
      expect(mockFunc.mock.calls[0][0]).toBe('a');
    });
  });

  describe('invalid observer', () => {
    let baseFormItem;
    beforeEach(() => {
      baseFormItem = new BaseFormItem();
    });

    it('called', () => {
      const mockFunc = jest.fn();
      baseFormItem.addValidator({
        validator(value) {
          return value.length > 0;
        },
        message: 'empty',
      });
      baseFormItem.addInvalidObserver(mockFunc);

      baseFormItem.value = '';

      expect.assertions(2);
      expect(mockFunc.mock.calls).toHaveLength(1);
      expect(mockFunc.mock.calls[0][0]).toBe(true);
    });
  });
});
