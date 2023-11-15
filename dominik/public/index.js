"use strict";
(() => {
  // src/validation.ts
  var isRequired = (value) => !!value;
  var isPhoneNumber = (value) => !!value && /^([\+]?[0-9]{2}[\s-]?|0)[0-9]{9,10}$/gm.test(value);
  var isEmail = (value) => !!value && /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value);
  var isDateInRange = (value) => {
    if (!value) {
      return false;
    }
    const tomorrow = /* @__PURE__ */ new Date();
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = new Date(value);
    return date < tomorrow;
  };
  var parseRecord = (fields) => {
    const fieldNames = ["name", "email", "dateOfBirth", "phoneNumber"];
    return fieldNames.reduce((record, fieldName) => {
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
        [fieldName]: value
      };
    }, {});
  };

  // src/state.ts
  var addRecord = (records2, fields) => {
    const record = parseRecord(fields);
    records2.push(record);
    return records2;
  };
  var removeRecord = (records2, index) => {
    if (index < 0 || index >= records2.length) {
      throw new Error("Invalid record index");
    }
    const newRecords = [...records2];
    newRecords.splice(index, 1);
    return newRecords;
  };

  // src/index.ts
  var maxCols = 5;
  var records = [];
  var renderEmptyView = (tbody) => {
    tbody.innerHTML = `<tr><td colspan="${maxCols}">No records</td></tr>`;
  };
  var renderRecords = (tbody, records2) => {
    const rows = records2.map((record, index) => {
      const { name, email, dateOfBirth, phoneNumber } = record;
      const deleteButton = (index2) => `<form data-record-index="${index2}"><button type="submit" class="delete-button" data-testid="delete-button-${index2}">x</button></form>`;
      const cells = [name, email, dateOfBirth, phoneNumber, deleteButton(index)].map((val) => `<td>${val}</td>`).join("");
      return `<tr>${cells}</tr>`;
    });
    tbody.innerHTML = rows.join("");
  };
  var renderRecordsView = (table, records2) => {
    const tbody = table.querySelector("tbody");
    if (!tbody) {
      throw new Error("No table found");
    }
    if (records2.length === 0) {
      renderEmptyView(tbody);
    } else {
      renderRecords(tbody, records2);
    }
  };
  var displayError = (error) => window.alert(error.message);
  var main = () => {
    document.querySelector("#dateOfBirth")?.setAttribute("max", (/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    const form = document.querySelector("form");
    const outputTable = document.querySelector(
      "#records-view table"
    );
    if (!form) {
      throw new Error("No Form found");
    }
    if (!outputTable) {
      throw new Error("No output table found");
    }
    form.addEventListener("input", (event) => {
      const formElement = event.target;
      const formData = new FormData(formElement?.form);
      const fields = Object.fromEntries(formData.entries());
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form2 = event.target;
      const formData = new FormData(form2);
      const fields = Object.fromEntries(formData.entries());
      try {
        records = addRecord(records, fields);
        renderRecordsView(outputTable, records);
        form2.reset();
      } catch (error) {
        displayError(error);
      }
    });
    outputTable.addEventListener("submit", (event) => {
      event.preventDefault();
      const form2 = event.target;
      const { recordIndex } = form2?.dataset;
      try {
        records = removeRecord(records, Number(recordIndex));
        renderRecordsView(outputTable, records);
      } catch (error) {
        displayError(error);
      }
    });
  };
  main();
})();
