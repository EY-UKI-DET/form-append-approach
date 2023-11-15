import { parseRecord } from "../validation";

const testRecord = {
  email: "test@email.invalid",
  name: "Testeve",
  phoneNumber: "+447912345678",
  dateOfBirth: "2000-01-01",
};

describe("Validation", () => {
  describe("parseRecord", () => {
    it("should return a valid record", () => {
      expect(parseRecord(testRecord)).toEqual(testRecord);
      expect(
        parseRecord({ ...testRecord, phoneNumber: "07912345678" })
      ).toEqual({ ...testRecord, phoneNumber: "07912345678" });
    });

    it("should throw errors when parsing invalid data", () => {
      expect(() => parseRecord({})).toThrow(TypeError);

      expect(() => parseRecord({ name: "test" })).toThrow(TypeError);

      expect(() =>
        parseRecord({ name: "test", email: "not_an_email" })
      ).toThrow(TypeError);
      expect(() =>
        parseRecord({ name: "test", email: "test@test.com" })
      ).toThrow(TypeError);

      expect(() =>
        parseRecord({
          name: "test",
          email: "test@test.com",
          dateOfBirth: "not_a_date",
        })
      ).toThrow(TypeError);
      expect(() =>
        parseRecord({
          name: "test",
          email: "test@test.com",
          dateOfBirth: "2000-01-01",
        })
      ).toThrow(TypeError);

      expect(() =>
        parseRecord({
          name: "test",
          email: "test@test.com",
          dateOfBirth: "200-01-01",
          phoneNumber: "not_a_number",
        })
      ).toThrow(TypeError);
    });
  });
});
