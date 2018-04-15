import { BaseSelectFormItem } from "@/models";

describe("BaseSelectFormItem", () => {
  it("has properties", () => {
    const baseSelectFormItem = new BaseSelectFormItem("");

    expect("options" in baseSelectFormItem).toBe(true);
  });
});
