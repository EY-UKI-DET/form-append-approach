import { test, expect } from "@playwright/test";

const testRecord = {
  name: "test",
  email: "test@test.invalid",
  dateOfBirth: "2000-01-01",
  phoneNumber: "07912345678",
};

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Test page/);
});

test("has input form", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByLabel("Name")).toBeAttached();
  await expect(page.getByLabel("Email")).toBeAttached();
  await expect(page.getByLabel("Date Of Birth")).toBeAttached();
  await expect(page.getByLabel("Phone Number")).toBeAttached();
  await expect(page.getByRole("button", { name: "Submit" })).toBeAttached();
});

test("shows empty table by default", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("table")).toContainText("No records");
});

test("can add a record", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Name").fill(testRecord.name);
  await page.getByLabel("Email").fill(testRecord.email);
  await page.getByLabel("Date Of Birth").fill(testRecord.dateOfBirth);
  await page.getByLabel("Phone Number").fill(testRecord.phoneNumber);

  await page.getByRole("button", { name: "Submit" }).click();

  const rows = await page.$$eval("table tbody tr", (rows) => rows);
  expect(rows.length).toBe(1);

  await expect(page.getByRole("table")).toContainText(testRecord.name);
  await expect(page.getByRole("table")).toContainText(testRecord.email);
  await expect(page.getByRole("table")).toContainText(testRecord.dateOfBirth);
  await expect(page.getByRole("table")).toContainText(testRecord.phoneNumber);
});

test("can remove record", async ({ page }) => {
  await page.goto("/");
  const addRecord = async (name: string) => {
    await page.getByLabel("Name").fill(name);
    await page.getByLabel("Email").fill(testRecord.email);
    await page.getByLabel("Date Of Birth").fill(testRecord.dateOfBirth);
    await page.getByLabel("Phone Number").fill(testRecord.phoneNumber);

    await page.getByRole("button", { name: "Submit" }).click();
  };

  await addRecord("Name A");
  await addRecord("Name B");
  await addRecord("Name C");

  // Table with 3 records
  const rowsBefore = await page.$$eval("table tbody tr", (rows) => rows);
  expect(rowsBefore.length).toBe(3);

  await page.getByTestId("delete-button-1").click();

  // Table with 2 records
  const rowsAfter = await page.$$("table tbody tr");
  await expect(rowsAfter.length).toBe(2);
});

test("shows alert on validation error", async ({ page }) => {
  await page.goto("/");

  page.on("dialog", async (dialog) => {
    await expect(dialog.message()).toBe('Field "name" is required');
    dialog.accept();
  });
  await page.getByRole("button", { name: "Submit" }).click();
});
