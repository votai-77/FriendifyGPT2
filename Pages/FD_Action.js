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
      .locator(
        '//*[@id="__next"]/div[1]/div/div/div[3]/div/div/div[2]/label/div'
      )
      .filter({ hasText: "Upload File (Max 5MB .pdf)" })
      .first()
      .click();

    await this.page
      .locator('//*[@id="headlessui-dialog-:r2d:"]/div/div[2]')
      .setInputFiles(config.filePDF);
    await this.page.getByRole("button", { name: "Start Summary" }).click();
    await this.page.waitForTimeout(10000);
  }
  async summaryAudio() {
    await this.page.getByText("Audio").click();
    await this.page
      .locator(
        '//*[@id="__next"]/div[1]/div/div/div[3]/div/div/div[2]/label/div'
      )
      .filter({
        hasText:
          /^Upload File \(Max 5MB \.mp3\) Small or poor-quality sound may limit summarization\.$/,
      })
      .nth(1)
      .click();

    await this.page
      .locator('//*[@id="headlessui-dialog-:r2g:"]/div/div[2]/div')
      .setInputFiles(config.fileAudio);
    await this.page.getByRole("button", { name: "Start Summary" }).click();
    await this.page.waitForTimeout(10000);
  }

  async summaryImage() {
    await this.page.getByText("Image").click();
    await page
      .locator(
        '//*[@id="__next"]/div[1]/div/div/div[3]/div/div/div[2]/label/div'
      )
      .filter({ hasText: "Upload File (Max  5MB .png | .jpg) " })
      .first()
      .click();
    await page
      .locator(
        '//*[@id="__next"]/div[1]/div/div/div[3]/div/div/div[2]/label/div'
      )
      .setInputFiles(config.fileImage);
    await page
      .getByRole("main")
      .locator("div")
      .filter({ hasText: /^Summary$/ })
      .getByRole("button")
      .click();
    await page.getByRole("button", { name: "Let's start" }).click();
    await this.page.waitForTimeout(10000);
  }
  async removeObject() {
    await this.page
      .locator("label")
      .filter({ hasText: "Upload File (Max 5MB .png | ." })
      .locator("div")
      .first()
      .click();
    await this.page.locator("body").setInputFiles(config.removeObject);
    await this.page
      .locator("div")
      .filter({ hasText: /^Remove object$/ })
      .click();
    await this.page.getByRole("button", { name: "Let's start" }).click();
    await this.page.getByRole("slider").fill("44");
    await this.page
      .locator("canvas")
      .nth(1)
      .click({
        position: {
          x: 81,
          y: 284,
        },
      });
    await this.page.getByRole("button", { name: "Clean •" }).click();
    await this.page.waitForTimeout(10000);
  }
  async removeText() {
    await this.page
      .locator("label")
      .filter({ hasText: "Upload File (Max 5MB .png | ." })
      .locator("div")
      .first()
      .click();
    await this.page.locator("body").setInputFiles(config.removeText);
    await this.page
      .locator("div")
      .filter({ hasText: /^Remove text$/ })
      .getByRole("button")
      .click();
    await this.page.getByRole("button", { name: "Let's start" }).click();
    await this.page.waitForTimeout(10000);

  }
  async logout(){
    await this.page.getByRole('button', { name: 'avatar' }).click();
    await this.page.locator('div').filter({ hasText: /^Logout$/ }).nth(1).click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
  }
}
