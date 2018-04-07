import { NameFormItem } from "@/models";

describe("NameFormItem", () => {
  describe("validator", () => {
    let name;
    beforeEach(() => {
      name = new NameFormItem("");
    });

    it("valid name", () => {
      name.value = "test name";
      const messages = name.validator();

      expect(messages).toHaveLength(0);
    });

    it("empty", () => {
      name.value = "";
      const messages = name.validator();

      expect.assertions(2);
      expect(messages).toHaveLength(1);
      expect(messages).toContain(NameFormItem.MESSAGES.EMPTY);
    });

    it("too long", () => {
      name.value = Array(17)
        .fill("a")
        .join("");
      const messages = name.validator();

      expect.assertions(2);
      expect(messages).toHaveLength(1);
      expect(messages).toContain(NameFormItem.MESSAGES.EXPECT_LENGTH);
    });
  });
});
