export const isEmptyString = value => {
  return String(value).length === 0;
};

/**
 * 正規表現はinput[type="email"]を引用
 * https://www.w3.org/TR/html5/forms.html#valid-e-mail-address
 */
export const isEmail = value => {
  return /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
    value,
  );
};

export const isExpectLength = (value, { max = Infinity, min = 0 } = {}) => {
  const str = String(value);
  if (str.length > max) {
    return false;
  }
  if (str.length < min) {
    return false;
  }
  return true;
};
