import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Form append/);
});

test("has entire form", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByLabel("📝 Name")).toBeAttached();
  await expect(page.getByLabel("📧 Email")).toBeAttached();
  await expect(page.getByLabel("🐣 Birth date")).toBeAttached();
  await expect(page.getByLabel("☎️ Phone")).toBeAttached();
  await expect(page.getByRole("button", { name: "💾 Save" })).toBeAttached();
});

const DEMO_DATA = {
  name: "John",
  email: "me@email.com",
  birthdate: "1980-01-01",
  tel: "07777777777",
};

test("can submit form successfully", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("📝 Name").fill(DEMO_DATA.name);
  await page.getByLabel("📧 Email").fill(DEMO_DATA.email);
  await page.getByLabel("🐣 Birth date").fill(DEMO_DATA.birthdate);
  await page.getByLabel("☎️ Phone").fill(DEMO_DATA.tel);
  await page.getByRole("button", { name: "💾 Save" }).click();
  await expect(page.getByRole("code")).toContainText(JSON.stringify(DEMO_DATA));
});

test("can remove item", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("📝 Name").fill(DEMO_DATA.name);
  await page.getByLabel("📧 Email").fill(DEMO_DATA.email);
  await page.getByLabel("🐣 Birth date").fill(DEMO_DATA.birthdate);
  await page.getByLabel("☎️ Phone").fill(DEMO_DATA.tel);
  await page.getByRole("button", { name: "💾 Save" }).click();
  await expect(page.getByRole("code")).not.toBeEmpty();
  await page.getByRole("button", { name: "🗑️" }).click();
  await expect(page.getByRole("code")).toBeEmpty();
});

test("throws name missing error", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "💾 Save" }).click();
  await expect(page.getByRole("alert")).toHaveText("Name is required.");
  await expect(page.getByRole("code")).toBeEmpty();
});

test("throws email missing error", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("📝 Name").fill(DEMO_DATA.name);
  await page.getByRole("button", { name: "💾 Save" }).click();
  await expect(page.getByRole("alert")).toHaveText("Email is required.");
  await expect(page.getByRole("code")).toBeEmpty();
});

// @note Here I guess you'd expect the test for the incorrect email but the browser
// validation takes over as it's a type="email" input. I could have it as a normal
// type="text" but it's really best for usability to have the email type still, not
// just for browser validation but the keyboard display on mobile is more appropriate.

test("throws birthdate missing error", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("📝 Name").fill(DEMO_DATA.name);
  await page.getByLabel("📧 Email").fill(DEMO_DATA.email);
  await page.getByRole("button", { name: "💾 Save" }).click();
  await expect(page.getByRole("alert")).toHaveText(
    "Date of birth is required."
  );
  await expect(page.getByRole("code")).toBeEmpty();
});

test("throws phone missing error", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("📝 Name").fill(DEMO_DATA.name);
  await page.getByLabel("📧 Email").fill(DEMO_DATA.email);
  await page.getByLabel("🐣 Birth date").fill(DEMO_DATA.birthdate);
  await page.getByRole("button", { name: "💾 Save" }).click();
  await expect(page.getByRole("alert")).toHaveText("Phone is required.");
  await expect(page.getByRole("code")).toBeEmpty();
});

test("throws phone invalid error", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("📝 Name").fill(DEMO_DATA.name);
  await page.getByLabel("📧 Email").fill(DEMO_DATA.email);
  await page.getByLabel("🐣 Birth date").fill(DEMO_DATA.birthdate);
  await page.getByLabel("☎️ Phone").fill("not a phone number");
  await page.getByRole("button", { name: "💾 Save" }).click();
  await expect(page.getByRole("alert")).toHaveText(
    "Phone number is not valid."
  );
  await expect(page.getByRole("code")).toBeEmpty();
});
