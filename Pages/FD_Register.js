import { config } from "../Data/FD_Config";

export class Register {
  constructor(page) {
    this.page = page;
  }

  async registerAccount() {
    await this.page.goto(config.url);
    await this.page.getByRole('link', { name: 'Sign Up' }).click();
    const randomString = Math.random().toString(36).substring(2, 10);
    const randomEmail = `testfriendify${randomString}@gmail.com`;
    const password = "056839908Tai!@";
    await this.page.getByPlaceholder("Full name...").fill("test");
    await this.page.getByPlaceholder("Email...").fill(randomEmail);
    await this.page
      .getByPlaceholder("Password...", { exact: true })
      .fill(password);
    await this.page
      .getByPlaceholder("Confirm password...")
      .fill("056839908Tai!@");
    await this.page.getByRole("button", { name: "Register" }).click();
    await this.loginapp(randomEmail, password);
    await this.sendDiamond();

  }
  async loginapp(username, password) {
    await this.page.getByPlaceholder("Email...").fill(username);
    await this.page.getByPlaceholder("Password...").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
    await this.page.waitForTimeout(5000);
  }
  async sendDiamond() {
    await this.page.getByRole("link", { name: "Chat", exact: true }).click();
    await this.page.getByPlaceholder("Search...").fill("ssg");
    await this.page.locator("div").filter({ hasText: /^SSG$/ }).nth(3).click();
    await this.page
      .locator(".flex > div > div:nth-child(2) > div > div > .flex")
      .first()
      .click();
    await this.page.locator('//*[@id="__next"]/div[1]/div/div/div/main/div/div/div[2]/div/div[1]/div[2]/div[3]/div[1]/div').click();
    await this.page.getByPlaceholder("Enter here").fill("20");
    await this.page.locator('//*[@id="__next"]/div[1]/div/div/div/main/div/div/div[2]/div/div[1]/div[2]/button').click();
    await this.page.getByRole("button", { name: "Confirm" }).click();
  }

}
