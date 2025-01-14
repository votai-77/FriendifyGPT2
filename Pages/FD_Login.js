import path from "path";
import { config } from "../Data/FD_Config";
import fs from 'fs';
class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async loginEmail(){
    await this.page.goto(config.url);
    await this.page.getByText('Login').click();
    await this.page.getByPlaceholder('Email...').fill(config.email);
    await this.page.getByPlaceholder('Password...').fill(config.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.waitForTimeout(5000);
  }
  async loginGoogle() {
    await this.page.goto(config.url);
    await this.page.getByText('Login').click();
    const popupPromise = this.page.waitForEvent("popup");
    await this.page.locator("div").filter({ hasText: /^Continue with Google$/ }).nth(1).click();
    const popup = await popupPromise;

    await popup.getByLabel("Email or phone").fill(config.emailGoogle);
    await popup.getByRole("button", { name: "Next" }).click();
    await this.page.waitForTimeout(10000);
    await popup.getByLabel("Enter your password").fill(config.passwordGoogle);
    await popup.getByRole("button", { name: "Next" }).click();
    await this.page.getByRole("button", { name: "Skip" }).click();

    await this.saveCookies();
  }
  async saveCookies(){
    const cookies = await this.page.context().cookies();
    const filePath = path.join(config.cookiesDir, config.cookieFile);
    if(!fs.existSync(config.cookiesDir))
    {
        fs.mkdirSync(config.cookiesDir, {recursive: true});
    }
    fstat.writeFileSync(filePath, JSON.stringify(cookies,null,2));
  }
}
export default LoginPage;