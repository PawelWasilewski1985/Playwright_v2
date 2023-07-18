import type { Page } from '@playwright/test';
import utils from "../utils/utilsMethods";
import testData from "../testData/testData.json";

export class HomePageEcommerce {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('https://ecommerce-playground.lambdatest.io/');
    }

    async clickOnLogin() {
        await this.page.locator("xpath=//a[@data-toggle='dropdown']//span[contains(.,'My account')]").hover();
        await this.page.getByText("Login").click();
    }

    async enterEmailAndPassword() {
        utils.getEmailFromFile().then(async (email) => {
            await this.page.fill("input[name='email']", email)
        })
        await this.page.waitForTimeout(2000)
        await this.page.getByPlaceholder("Password").fill("Genowefa#1234");

    }

    async clickOnLoginButton() {
        await this.page.getByRole('button', { name: 'Login' }).click();
        //await this.page.pause();
    }

    async goToSettings() {
        await this.page.click('a[routerlink="/settings"]');
    }

    async clickOnRegister() {
        await this.page.locator("xpath=//a[@data-toggle='dropdown']//span[contains(.,'My account')]").hover();
        await this.page.getByText("Register").click();
    }

    async fillRegistrationForm(firstName: string, lastName: string) {
        const random = utils.generateRandomNumberWithString();
        const randomPhoneNumber = utils.generateRandomNumber();
        await this.page.getByPlaceholder("First Name").fill(firstName);
       // await this.page.waitForTimeout(1000);
        await this.page.getByPlaceholder("Last Name").fill(lastName);
        const emailField = await this.page.getByPlaceholder("E-Mail");
        await emailField.fill("email" + random + "@test.email");
        let emailValue = await emailField.inputValue();
        await utils.saveEmail(emailValue);
        console.log("============" + emailValue)
        await this.page.locator('#input-telephone').fill(randomPhoneNumber);
       // await this.page.waitForTimeout(1000);
        await this.page.locator('#input-password').fill(testData.password);
       // await this.page.waitForTimeout(2000);
        await this.page.locator('#input-confirm').fill(testData.password);

    }

    async fillRegistrationFormWithoutConfirmationOfPassword(firstName: string, lastName: string) {
        const random = utils.generateRandomNumberWithString();
        const randomPhoneNumber = utils.generateRandomNumber();
        await this.page.getByPlaceholder("First Name").fill(firstName);
        await this.page.getByPlaceholder("Last Name").fill(lastName);
        const emailField = await this.page.getByPlaceholder("E-Mail");
        await emailField.fill("email" + random + "@test.email");
        await this.page.locator('#input-telephone').fill(randomPhoneNumber);
        await this.page.locator('#input-password').fill(testData.password);
    }

    async clickOnContinueButton() {
        await this.page.locator("//input[@value='Continue']").click();
        //await this.page.pause();
    }

    async markConsents() {
        await this.page.locator("//label[@for='input-agree']").click(); 
    }

    async lackOfConfirmationPasswordMessage(message: string) {
        await this.page.getByText('Password confirmation does not match password!').isVisible();
    }

    async vaildationFieldInRegisterForm(dynamicText: string) {
        const message = await this.getByDynamicText(dynamicText);
        await message.isVisible();
    }

    async getByDynamicText(dynamicText: string) {
        const element = await this.page.waitForSelector(`:text("${dynamicText}")`);
        return element;
      }

    async getTextFromElementsAndStoreInList(selector: string): Promise<string[]> {
        const elements = await this.page.$$(selector);
        const texts: string[] = [];
      
        for (const element of elements) {
          const text = await element.innerText();
          console.log(text);
          texts.push(text);

        }
      
        return texts;
      }


}


