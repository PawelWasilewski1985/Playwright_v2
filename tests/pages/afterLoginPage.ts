import { Page, expect } from '@playwright/test';
import utils from "../utils/utilsMethods";

export class AfterLoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOnLogOutButton() {
        await utils.findElementAndClick(this.page, 'a[href="/logout"]');
    }

}