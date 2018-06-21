import { TitleFormItem } from '@/models';

describe('TitleFormItem', () => {
  describe('validator', () => {
    let title;
    beforeEach(() => {
      title = new TitleFormItem('');
    });

    it('valid title', () => {
      title.value = 'test title';
      const messages = title.validator();

      expect(messages).toHaveLength(0);
    });

    it('too long', () => {
      title.value = Array(33)
        .fill('a')
        .join('');
      const messages = title.validator();

      expect.assertions(2);
      expect(messages).toHaveLength(1);
      expect(messages).toContain(TitleFormItem.MESSAGES.EXPECT_LENGTH);
    });
  });
});
