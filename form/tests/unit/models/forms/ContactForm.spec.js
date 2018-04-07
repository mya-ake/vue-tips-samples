import { BaseForm, ContactForm } from "@/models";

describe("ContactForm", () => {
  describe("constructor", () => {
    it("basic", () => {
      const form = new ContactForm();
      expect(form instanceof BaseForm).toBeTruthy();
    });

    it("has initial values", () => {
      const initailValues = {
        name: "test name",
        email: "test@example.com",
        title: "test title",
        body: "test body"
      };
      const form = new ContactForm(initailValues);

      expect.assertions(4);
      expect(form.name.value).toBe(initailValues.name);
      expect(form.email.value).toBe(initailValues.email);
      expect(form.title.value).toBe(initailValues.title);
      expect(form.body.value).toBe(initailValues.body);
    });
  });

  describe("functions", () => {
    it("buildRequestBody", () => {
      const form = new ContactForm();

      const requestBody = form.buildRequestBody();
      expect("contact" in requestBody).toBeTruthy();
    });
  });
});
