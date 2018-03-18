import * as validators from "@/helpers/validators";

describe("Validators", () => {
  describe("isEmpty", () => {
    it("empty string", () => {
      expect(validators.isEmptyString("")).toBeTruthy();
    });

    it("undefined", () => {
      expect(validators.isEmptyString(undefined)).toBeFalsy();
    });

    it("null", () => {
      expect(validators.isEmptyString(null)).toBeFalsy();
    });

    it("0", () => {
      expect(validators.isEmptyString(0)).toBeFalsy();
    });
  });

  describe("isEmail", () => {
    it("is email", () => {
      expect(validators.isEmail("test@example.com")).toBeTruthy();
    });

    it("is number", () => {
      expect(validators.isEmail("12345")).toBeFalsy();
    });
  });

  describe("isExpectLength", () => {
    it("max 8", () => {
      expect.assertions(2);
      expect(validators.isExpectLength("12345678", { max: 8 })).toBeTruthy();
      expect(validators.isExpectLength("123456789", { max: 8 })).toBeFalsy();
    });

    it("min 8", () => {
      expect.assertions(2);
      expect(validators.isExpectLength("12345678", { min: 8 })).toBeTruthy();
      expect(validators.isExpectLength("1234567", { min: 8 })).toBeFalsy();
    });

    it("length 8", () => {
      expect.assertions(3);
      expect(
        validators.isExpectLength("1234567", { max: 8, min: 8 })
      ).toBeFalsy();
      expect(
        validators.isExpectLength("12345678", { max: 8, min: 8 })
      ).toBeTruthy();
      expect(
        validators.isExpectLength("123456789", { max: 8, min: 8 })
      ).toBeFalsy();
    });

    it("min 8, max 10", () => {
      expect.assertions(5);
      expect(
        validators.isExpectLength("1234567", { max: 10, min: 8 })
      ).toBeFalsy();
      expect(
        validators.isExpectLength("12345678", { max: 10, min: 8 })
      ).toBeTruthy();
      expect(
        validators.isExpectLength("123456789", { max: 10, min: 8 })
      ).toBeTruthy();
      expect(
        validators.isExpectLength("1234567890", { max: 10, min: 8 })
      ).toBeTruthy();
      expect(
        validators.isExpectLength("12345678901", { max: 10, min: 8 })
      ).toBeFalsy();
    });
  });
});
