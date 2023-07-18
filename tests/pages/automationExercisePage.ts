import { Page, expect } from '@playwright/test';
import utils from "../utils/utilsMethods";
import testData from "../testData/testData.json";

export class AutomationExerciseHomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openPage() {
        await this.page.goto('http://automationexercise.com');
    }

    async verifyThatHomePageIsVisibleSuccessfully() {
        const mainLogo = await this.page.locator('div.logo.pull-left');
        await mainLogo.isVisible();
       
    }

    async clickOnSignupLoginButton() {
        const signUpLoginButton = this.page.locator('li >> text=Signup / Login');
        await signUpLoginButton.click();
        
    }
   
    async checkWhetherRegisterFormTitleISVisible() {
        await this.page.getByRole('heading', { name: 'New User Signup!' }).isVisible();
    }

}