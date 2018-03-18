import { EmailFormItem } from "@/models";

describe("EmailFormItem", () => {
  describe("validator", () => {
    let email;
    beforeEach(() => {
      email = new EmailFormItem("");
    });

    it("valid email", () => {
      email.value = "test@example.com";
      const messages = email.validator();

      expect(messages).toHaveLength(0);
    });

    it("empty", () => {
      email.value = "";
      const messages = email.validator();

      expect.assertions(3);
      expect(messages).toHaveLength(2);
      expect(messages).toContain(EmailFormItem.MESSAGES.EMPTY);
      expect(messages).toContain(EmailFormItem.MESSAGES.INVALID_EMAIL);
    });

    it("invalid email", () => {
      email.value = "a";
      const messages = email.validator();

      expect.assertions(2);
      expect(messages).toHaveLength(1);
      expect(messages).toContain(EmailFormItem.MESSAGES.INVALID_EMAIL);
    });
  });
});
