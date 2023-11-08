export class FormError extends Error {}

// @note Some simple regular expressions.
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const telRegExp = /^[0-9()-]+$/;

/**
 * @note The usual thing to do here would be to take advantage of the in built browser
 * validations and then validate the data on the server before processing because this
 * code is still living on the client's machine. This is just being done for examination
 * purposes.
 */
export default function validateForm(form: HTMLFormElement) {
  const formData = new FormData(form);
  const name = formData.get("name")?.toString();
  if (!name || name === "") throw new FormError("Name is required.");
  const email = formData.get("email")?.toString();
  if (!email || email === "") throw new FormError("Email is required.");
  if (!emailRegExp.test(email)) throw new FormError("Email is not valid.");
  const birthdate = formData.get("birthdate")?.toString();
  if (!birthdate || birthdate === "")
    throw new FormError("Date of birth is required.");
  const tel = formData.get("tel")?.toString();
  if (!tel || tel === "") throw new FormError("Phone is required.");
  if (!telRegExp.test(tel)) throw new FormError("Phone number is not valid.");
  return { name, email, birthdate, tel };
}
