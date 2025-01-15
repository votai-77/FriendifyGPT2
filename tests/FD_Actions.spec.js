import { test } from "@playwright/test";
import LoginPage from "../Pages/FD_Login";

test("Login success with account resisted!", async ({ page }) => {
  const login = new LoginPage(page);
  await login.login();
});
