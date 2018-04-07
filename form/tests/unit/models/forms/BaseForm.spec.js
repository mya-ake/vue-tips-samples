import { BaseForm, BaseFormItem } from "@/models";

describe("BaseFrom", () => {
  describe("constructor", () => {
    it("basic", () => {
      const baseForm = new BaseForm();

      expect.assertions(2);
      expect(typeof baseForm.properties).toBe("function");
      expect(typeof baseForm.buildRequestBody).toBe("function");
    });
  });

  describe("functions", () => {
    it("properties", () => {
      const baseForm = new BaseForm();
      baseForm.prop1 = "prop1 value";
      baseForm.prop2 = new BaseFormItem("prop2 value");

      expect(baseForm.properties()).toEqual({
        prop1: "prop1 value",
        prop2: "prop2 value"
      });
    });

    it("buildRequestBody", () => {
      const baseForm = new BaseForm();
      baseForm.prop1 = "prop1 value";
      baseForm.prop2 = new BaseFormItem("prop2 value");

      expect(baseForm.properties()).toEqual({
        prop1: "prop1 value",
        prop2: "prop2 value"
      });
    });
  });
});
