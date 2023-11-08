/**
 * @jest-environment jsdom
 */

// @todo -> fix import/export issue and remove duplicated function declarations
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};

describe("Custom Validation Functions", () => {
  test("isValidEmail() should return true for a valid email", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
  });

  test("isValidEmail() should return false for an invalid email", () => {
    expect(isValidEmail("invalid_email")).toBe(false);
  });

  test("isValidDate() should return true for a valid date", () => {
    expect(isValidDate("2023-11-02")).toBe(true);
  });

  test("isValidDate() should return false for an invalid date", () => {
    expect(isValidDate("invalid_date")).toBe(false);
  });
});
