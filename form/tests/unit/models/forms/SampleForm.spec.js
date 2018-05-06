import { BaseForm, SampleForm } from "@/models";

describe("ContactForm", () => {
  describe("constructor", () => {
    it("basic", () => {
      const form = new SampleForm();
      expect(form instanceof BaseForm).toBe(true);
    });
  });
});
