import type { DataRecord } from "./types";
import { addRecord, removeRecord } from "./state";

const maxCols = 5;
let records: DataRecord[] = [];

const renderEmptyView = (tbody: HTMLElement) => {
  tbody.innerHTML = `<tr><td colspan="${maxCols}">No records</td></tr>`;
};

const renderRecords = (tbody: HTMLElement, records: DataRecord[]) => {
  const rows = records.map((record, index) => {
    const { name, email, dateOfBirth, phoneNumber } = record;

    const deleteButton = (index: number) =>
      `<form data-record-index="${index}"><button type="submit" class="delete-button" data-testid="delete-button-${index}" aria-label="Delete record">x</button></form>`;

    const cells = [name, email, dateOfBirth, phoneNumber, deleteButton(index)]
      .map((val) => `<td>${val}</td>`)
      .join("");

    return `<tr>${cells}</tr>`;
  });

  tbody.innerHTML = rows.join("");
};

const renderRecordsView = (table: HTMLElement, records: DataRecord[]) => {
  const tbody = table.querySelector("tbody");

  if (!tbody) {
    throw new Error("No table found");
  }

  if (records.length === 0) {
    renderEmptyView(tbody);
  } else {
    renderRecords(tbody, records);
  }
};

const displayError = (error: Error) => window.alert(error.message);

const main = () => {
  document
    .querySelector("#dateOfBirth")
    ?.setAttribute("max", new Date().toISOString().split("T")[0]);

  const form = document.querySelector("form");
  const outputTable = document.querySelector(
    "#records-view table"
  ) as HTMLTableElement | null;

  if (!form) {
    throw new Error("No Form found");
  }
  if (!outputTable) {
    throw new Error("No output table found");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);
    const fields = Object.fromEntries(formData.entries());

    try {
      records = addRecord(records, fields);
      renderRecordsView(outputTable, records);
      form.reset();
    } catch (error: any) {
      displayError(error);
    }
  });

  outputTable.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const { recordIndex } = form?.dataset;

    try {
      records = removeRecord(records, Number(recordIndex));
      renderRecordsView(outputTable, records);
    } catch (error: any) {
      displayError(error);
    }
  });
};

main();
