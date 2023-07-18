import { Page, expect } from '@playwright/test';

export class LoggedUserPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async assertWhetherUserIsCorrectlyLogged() {
        //const actualUrl = await this.page.url();
        expect(await this.page.url()).toContain('account/account')

    }
   

}