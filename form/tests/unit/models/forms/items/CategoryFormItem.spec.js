import { CategoryFormItem } from "@/models";

describe("CategoryFormItem", () => {
  describe("validator", () => {
    let category;
    beforeEach(() => {
      category = new CategoryFormItem("");
    });

    it("valid category", () => {
      category.value = category.options[0].value;
      const messages = category.validator();

      expect(messages).toHaveLength(0);
    });

    it("empty", () => {
      const messages = category.validator();

      expect.assertions(2);
      expect(messages).toHaveLength(1);
      expect(messages).toContain(CategoryFormItem.MESSAGES.EMPTY);
    });

    it("invalid", () => {
      category.value = "test";
      const messages = category.validator();

      expect.assertions(2);
      expect(messages).toHaveLength(1);
      expect(messages).toContain(CategoryFormItem.MESSAGES.INVALID);
    });
  });
});
