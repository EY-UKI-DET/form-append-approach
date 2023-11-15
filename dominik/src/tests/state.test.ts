import { addRecord, removeRecord } from "../state";

const testRecord = {
  email: "test@email.invalid",
  name: "Testeve",
  phoneNumber: "+447912345678",
  dateOfBirth: "2000-01-01",
};

describe("State", () => {
  describe("addRecord", () => {
    it("should add a record", () => {
      expect(addRecord([], testRecord).length).toBe(1);
    });
  });

  describe("removeRecord", () => {
    it("should remove a record", () => {
      const initialState = [
        { ...testRecord, name: "A" },
        { ...testRecord, name: "B" },
        { ...testRecord, name: "C" },
      ];

      const expectedState = [
        { ...testRecord, name: "A" },
        { ...testRecord, name: "C" },
      ];

      expect(removeRecord(initialState, 1)).toEqual(expectedState);
    });

    it("should throw error on invalid index", () => {
      expect(() => removeRecord([], -1)).toThrow(Error);
      expect(() => removeRecord([], 0)).toThrow(Error);
      expect(() => removeRecord([], 1)).toThrow(Error);
    });
  });
});
