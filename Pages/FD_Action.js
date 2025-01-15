import { config } from "../Data/FD_Config";

export class Action {
  constructor(page) {
    this.page = page;
  }

  async login() {
    await this.page.goto(config.urlLogin);
    await this.page.getByPlaceholder("Email...").fill(config.email);
    await this.page.getByPlaceholder("Password...").fill(config.password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }
  async generateText() {
    await this.page
      .getByPlaceholder("Type something...")
      .fill(config.promptBot);
    await this.page.locator("form").getByRole("button").click();
    await this.page
      .locator(
        '//*[@id="__next"]/div[1]/div/div/div/main/div/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div[1]/div/div/p'
      )
      .innerText();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole("main").getByRole("link").first().click();
  }
  async generateImageStandard() {
    await this.page
      .getByRole("link", { name: "Create new", exact: true })
      .click();
    await this.page.getByPlaceholder("Describe your image...").fill("car");
    await this.page.getByRole("button", { name: "Generate" }).click();
    await this.page.waitForTimeout(10000);
  }
  async generateImagePro() {
    await this.page
      .getByPlaceholder("Describe your image...")
      .fill("the car pro");
    await this.page.getByRole("button", { name: "Pro •" }).click();
    await this.page.getByRole("button", { name: "Generate" }).click();
  }
  async chatUser() {
    await this.page.getByRole("link", { name: "Chat", exact: true }).click();
    await this.page.getByPlaceholder("Search...").click();
    await this.page.getByPlaceholder("Search...").fill(config.search_user);
    await this.page
      .locator("div")
      .filter({ hasText: /^votai$/ })
      .nth(3)
      .click();
    await this.page.getByRole("img", { name: "ask_bot" }).click();
    await this.page
      .getByPlaceholder("Type a message...")
      .nth(1)
      .fill("Xin chào bạn ");
    await this.page
      .locator("form")
      .filter({ hasText: "Xin chào bạn" })
      .getByRole("button")
      .click();
    await this.page.waitForTimeout(10000);
    await this.page.locator(".mt-4 > .flex-1").innerText();
  }
  async summaryPDF() {
    await this.page.getByRole("link", { name: "Assist" }).click();
    await this.page
      .locator("label")
      .filter({ hasText: "Upload File (Max 5MB .pdf)" })
      .locator("div")
      .nth(1)
      .click();
    await this.page
      .locator("body")
      .setInputFiles("Tongram requirements 2.3 (1).pdf");
    await this.page.getByRole("button", { name: "Start Summary" }).click();
    await this.page.waitForTimeout(10000);
  }
}
