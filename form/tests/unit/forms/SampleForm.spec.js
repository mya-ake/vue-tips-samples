import { BaseForm } from '@/lib';
import { SampleForm } from '@/forms';

describe('ContactForm', () => {
  describe('constructor', () => {
    it('basic', () => {
      const form = new SampleForm();
      expect(form instanceof BaseForm).toBe(true);
    });
  });
});
