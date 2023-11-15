import type { DataRecord } from "./types";

const isRequired = (value?: string) => !!value;
const isPhoneNumber = (value?: string) =>
  !!value && /^([\+]?[0-9]{2}[\s-]?|0)[0-9]{9,10}$/gm.test(value);
const isEmail = (value?: string) =>
  !!value && /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value);
const isDateInRange = (value?: string) => {
  if (!value) {
    return false;
  }

  const tomorrow = new Date();
  tomorrow.setHours(0);
  tomorrow.setMinutes(0);
  tomorrow.setSeconds(0);
  tomorrow.setMilliseconds(0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const date = new Date(value);

  return date < tomorrow;
};

const parseRecord = (fields: any) => {
  const fieldNames = ["name", "email", "dateOfBirth", "phoneNumber"];

  return fieldNames.reduce<DataRecord>((record, fieldName) => {
    const value = fields[fieldName]?.trim();

    if (fieldName === "name") {
      if (!isRequired(value)) {
        throw new TypeError(`Field "${fieldName}" is required`);
      }
    }

    if (fieldName === "email") {
      if (!isRequired(value)) {
        throw new TypeError(`Field "${fieldName}" is required`);
      } else if (!isEmail(value)) {
        throw new TypeError(`Field "${fieldName}" is not a valid email`);
      }
    }

    if (fieldName === "phoneNumber") {
      if (!isRequired(value)) {
        throw new TypeError(`Field "${fieldName}" is required`);
      } else if (!isPhoneNumber(value)) {
        throw new TypeError(`Field "${fieldName}" is not a valid phone number`);
      }
    }

    if (fieldName === "dateOfBirth") {
      if (!isRequired(value)) {
        throw new TypeError(`Field "${fieldName}" is required`);
      } else if (!isDateInRange(value)) {
        throw new TypeError(
          `Field ${fieldName} is not a date in an acceptable range`
        );
      }
    }

    return {
      ...record,
      [fieldName]: value,
    };
  }, {} as DataRecord);
};

export { parseRecord };
