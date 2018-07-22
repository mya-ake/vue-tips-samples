import { BaseSelectFormItem } from '@/lib';

describe('BaseSelectFormItem', () => {
  describe('Built-in validator', () => {
    it('valid, true', () => {
      const baseSelectFormItem = new BaseSelectFormItem();
      baseSelectFormItem.options = [
        {
          text: 'test',
          value: 'test',
        },
      ];
      expect(baseSelectFormItem.valid('test')).toBe(true);
    });

    it('valid, false', () => {
      const baseSelectFormItem = new BaseSelectFormItem();
      expect(baseSelectFormItem.valid('test')).toBe(false);
    });
  });
});
