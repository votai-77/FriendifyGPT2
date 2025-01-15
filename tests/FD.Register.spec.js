import { test } from "@playwright/test";
import { Register } from "../Pages/FD_Register";

test("register", async ({ page }) => {
  const register = new Register(page);
  await register.registerAccount();
  await page.close();

});
