import { Page, expect } from '@playwright/test';
import utils from "../utils/utilsMethods";
import testData from "../testData/testData.json";

export class AfterRegisterPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async assertIfAccountIsCreated(text: string) {
        const accountCreatad = await utils.elementExists(this.page, '//h2//b');
        //expect(accountCreatad).toBeTruthy();
        let actualText = await this.page.locator('//h2//b').textContent();
        expect(actualText).toContain(text);
    }

    async clickOnContinueButton() {
        await utils.findElementAndClick(this.page, 'a[data-qa="continue-button"]');
    }

    async clickOnCreateAccount() {
        await utils.findElementAndClick(this.page, 'button[data-qa="create-account"]');
    }

    async checkWheteherUserIsLogged() {
        //await this.page.pause();
        await utils.elementExists(this.page, 'a i.fa.fa-user + b');
    }

    async clickOnDeleteAccount() {
        await utils.findElementAndClick(this.page, 'a[href="/delete_account"]');
        
    }

    async checkIfAccountIsDeleted() {
        const accountDeleted = await utils.getTextByXPath(this.page, '//h2[@data-qa]');
        expect(accountDeleted).toContain("Account Deleted!");
    }
}