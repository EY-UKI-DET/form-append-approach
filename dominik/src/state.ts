import { parseRecord } from "./validation";
import type { DataRecord } from "./types";

const addRecord = (records: DataRecord[], fields: any) => {
  const record = parseRecord(fields);
  records.push(record);

  return records;
};

const removeRecord = (records: DataRecord[], index: number) => {
  if (index < 0 || index >= records.length) {
    throw new Error("Invalid record index");
  }

  const newRecords = [...records];
  newRecords.splice(index, 1);

  return newRecords;
};

export { addRecord, removeRecord };
