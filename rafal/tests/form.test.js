/**
 * @jest-environment jsdom
 */

import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
} from "@testing-library/dom";
// adds special assertions like toHaveTextContent
import "@testing-library/jest-dom";

function getExampleDOM() {
  const form = document.createElement("form");
  form.innerHTML = `
      <div class="input-container ic1">
          <label for="name">Name:</label>
          <input id="name" class="input" type="text" required aria-label="Name" />
      </div>
      <button type="submit" class="submit">Submit</button>
  `;

  const button = form.querySelector("button");
  const input = form.querySelector("input");

  button.addEventListener("click", () => {
    setTimeout(() => {
      const printedNameContainer = document.createElement("div");
      printedNameContainer.innerHTML = `
        <div data-testid="printed-name">${input.value}</div>
      `;
      form.appendChild(printedNameContainer);
    }, Math.floor(Math.random() * 200));
  });

  return form;
}

test("examples of some things", async () => {
  const famousProgrammerInHistory = "Rafal";
  const container = getExampleDOM();

  const input = getByLabelText(container, "Name");
  input.value = famousProgrammerInHistory;

  getByText(container, "Submit").click();

  await waitFor(() =>
    expect(queryByTestId(container, "printed-name")).toBeTruthy()
  );

  expect(getByTestId(container, "printed-name")).toHaveTextContent(
    famousProgrammerInHistory
  );

  expect(container).toMatchSnapshot();
});
