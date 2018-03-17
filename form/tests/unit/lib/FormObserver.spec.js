import { FormObserver } from "@/lib/FormObserver";

describe("FormObserver", () => {
  const names = ["item1", "item2"];
  let formObserver;
  beforeEach(() => {
    formObserver = new FormObserver(names);
  });

  it("constructor", () => {
    expect.assertions(names.length * 2 + 2);

    expect(formObserver.names).toBe(names);
    expect(formObserver.hasError).toBeTruthy();
    Object.keys(formObserver._results).forEach(name => {
      expect(names.includes(name)).toBeTruthy();
      expect(formObserver._results[name]).toBeFalsy();
    });
  });

  it("setResult", () => {
    const targetName = names[0];
    formObserver.setResult(targetName, true);

    expect(formObserver._results[targetName]).toBeTruthy();
  });

  it("全ての要素の結果がtrue", () => {
    for (const name of names) {
      formObserver.setResult(name, true);
    }

    expect(formObserver.hasError).toBeFalsy();
  });

  it("1つがtrueでもう1つがfalse", () => {
    formObserver.setResult(names[0], true);
    formObserver.setResult(names[1], false);

    expect(formObserver.hasError).toBeTruthy();
  });
});
