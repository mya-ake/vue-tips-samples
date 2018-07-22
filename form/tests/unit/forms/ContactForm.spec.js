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
        title: 'test title',
        body: 'test body',
      };
      const form = new ContactForm(initailValues);

      expect.assertions(4);
      expect(form.items.name.value).toBe(initailValues.name);
      expect(form.items.email.value).toBe(initailValues.email);
      expect(form.items.title.value).toBe(initailValues.title);
      expect(form.items.body.value).toBe(initailValues.body);
    });
  });

  describe('functions', () => {
    it('buildRequestBody', () => {
      const form = new ContactForm();

      const requestBody = form.buildRequestBody();
      expect('contact' in requestBody).toBe(true);
    });
  });
});
