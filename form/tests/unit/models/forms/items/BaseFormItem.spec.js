import { BaseFormItem } from "@/models";

describe("BaseFormItem", () => {
  it("has properties", () => {
    const baseFormItem = new BaseFormItem("");

    expect.assertions(2);
    expect("value" in baseFormItem).toBeTruthy();
    expect("validator" in baseFormItem).toBeTruthy();
  });
});
