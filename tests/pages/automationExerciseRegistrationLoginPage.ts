import { Page, expect } from '@playwright/test';
import utils from "../utils/utilsMethods";
import testData from "../testData/testData.json";

export class AutomationExerciseRegistrationLoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async provideNameInRegistrationSection(userName: string) {
        await this.page.locator('input[data-qa="signup-name"]').fill(userName);

    }

    async provideRandomEmailInRegistrationSection(email: string) {
        const random = utils.generateRandomNumberWithString();
        await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email + random + "@test.email");
        const emailField = await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder("Email Address");
        let emailValue = await emailField.inputValue();
        await utils.saveEmail(emailValue);
       

    }

    async clickOnSignUpButton() {
        await this.page.getByRole('button', { name: 'Signup' }).click();
    }

}