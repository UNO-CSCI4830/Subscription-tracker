const {
  validateEmail,
  validatePassword,
  validateName,
  validatePrice,
  validateDate
} = require("./js/validation");

test("Valid email passes", () => {
  expect(validateEmail("test@gmail.com")).toBe(true);
});

test("Invalid email fails", () => {
  expect(validateEmail("testgmail.com")).toBe(false);
});

test("Password must be at least 6 characters", () => {
  expect(validatePassword("123456")).toBe(true);
  expect(validatePassword("123")).toBe(false);
});

test("Name cannot be empty", () => {
  expect(validateName("Netflix")).toBe(true);
  expect(validateName("")).toBe(false);
});

test("Price must be positive", () => {
  expect(validatePrice(10)).toBe(true);
  expect(validatePrice(-5)).toBe(false);
});

test("Date must not be in the past", () => {
  expect(validateDate("2099-01-01")).toBe(true);
  expect(validateDate("2000-01-01")).toBe(false);
});