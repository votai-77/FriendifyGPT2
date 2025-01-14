import { test, chromium } from "@playwright/test";
import LoginPage from "../Pages/FD_Login";

let browsers;
let page;
let login;
test.beforeEach(async () => {
  browsers = await chromium.launch();
  page = await browsers.newPage();
  login = new LoginPage(page);
});

test.afterEach(async () => {
  await page.close();
  await browsers.close();
});

test("Login with Google", async ({page}) => {
  //  await login.loginGoogle(true);
  //test
  await login.loginEmail(); 
});