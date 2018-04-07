import { BodyFormItem } from "@/models";

describe("BodyFormItem", () => {
  describe("validator", () => {
    let body;
    beforeEach(() => {
      body = new BodyFormItem("");
    });

    it("valid body", () => {
      body.value = "test";
      const messages = body.validator();

      expect(messages).toHaveLength(0);
    });

    it("empty", () => {
      body.value = "";
      const messages = body.validator();

      expect.assertions(2);
      expect(messages).toHaveLength(1);
      expect(messages).toContain(BodyFormItem.MESSAGES.EMPTY);
    });

    it("too long", () => {
      body.value = Array(501)
        .fill("a")
        .join("");
      const messages = body.validator();

      expect.assertions(2);
      expect(messages).toHaveLength(1);
      expect(messages).toContain(BodyFormItem.MESSAGES.EXPECT_LENGTH);
    });
  });
});
