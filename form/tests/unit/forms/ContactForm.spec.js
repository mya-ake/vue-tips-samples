import { BaseForm } from '@/lib';
import { ContactForm } from '@/forms';

describe('ContactForm', () => {
  describe('constructor', () => {
    it('basic', () => {
      const form = new ContactForm();
      expect(form instanceof BaseForm).toBe(true);
    });

    it('has initial values', () => {
      const initailValues = {
        name: 'test name',
        email: 'test@example.com',
        category: 'サービスについて',
        title: 'test title',
        body: 'test body',
      };
      const form = new ContactForm(initailValues);

      expect.assertions(5);
      expect(form.items.name.value).toBe(initailValues.name);
      expect(form.items.email.value).toBe(initailValues.email);
      expect(form.items.category.value).toBe(initailValues.category);
      expect(form.items.title.value).toBe(initailValues.title);
      expect(form.items.body.value).toBe(initailValues.body);
    });
  });

  describe('methods', () => {
    it('buildRequestBody', () => {
      const form = new ContactForm();

      const requestBody = form.buildRequestBody();
      expect('contact' in requestBody).toBe(true);
    });
  });

  describe('validators', () => {
    describe('title, by category', () => {
      it('カテゴリのその他を選択したときタイトルの入力が必要', () => {
        const form = new ContactForm();

        const category = form.items.category;
        const otherIndex = category.options.length - 1;
        const otherOption = category.options[otherIndex];
        category.value = otherOption.value;

        expect(form.items.title.invalid).toBe(true);
      });

      it('その他以外の選択しているときはタイトルは必須ではない', () => {
        const form = new ContactForm();

        const category = form.items.category;
        const firstOption = category.options[0];
        category.value = firstOption.value;

        expect(form.items.title.invalid).toBe(false);
      });
    });
  });
});
