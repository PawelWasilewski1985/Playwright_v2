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
        utils.clickIfExists(this.page, 'button.fc-button.fc-cta-consent.fc-primary-button');
    }

    async verifyThatHomePageIsVisibleSuccessfully() {
        const mainLogo = await this.page.locator('div.logo.pull-left');
        await mainLogo.isVisible();
    }

    async verifyThatUserIsOnHomePageByUrl() {


    }

    async clickOnSignupLoginButton() {
        const signUpLoginButton = this.page.locator('li >> text=Signup / Login');
        await signUpLoginButton.click();
    }

    async checkWhetherRegisterFormTitleISVisible() {
        await this.page.getByRole('heading', { name: 'New User Signup!' }).isVisible();
    }

    async checkWhetherLoginFormTitleISVisible() {
        await this.page.getByRole('heading', { name: 'Login to your account' }).isVisible();

    }

    async enterEmailAndPassword() {
        utils.getEmailFromFile().then(async (email) => {
            await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
        })
        await this.page.waitForTimeout(1000)
        await this.page.getByPlaceholder('Password').fill("!QAZ2wsx");
        await this.page.waitForTimeout(1000);
    }

    async enterEmailAndPasswordWithParameters(email: string, password: string) {
        await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
        await this.page.waitForTimeout(1000)
        await this.page.getByPlaceholder('Password').fill(password);
    }

    async clickOnLoginButton() {
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async checkWheteherUserIsNotLogged() {
        await utils.elementExists(this.page, 'p[style="color: red;"]');

    }

    async checkIfTheTextAboutIncorrectLoginIsCorrectlyDisplayed() {
        await utils.checkElementContainsText(this.page, 'p[style="color: red;"]',
            'Your email or password is incorrect!');
    }

    async clickOnContactUs() {
        const contactUsSelector = 'li a[href="/contact_us"]';
        await utils.findElementAndClick(this.page, contactUsSelector);
    }
}

//await this.page.pause();