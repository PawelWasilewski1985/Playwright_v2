import { Page, expect } from '@playwright/test';
import utils from "../utils/utilsMethods";

export class ContactUsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async checkWhetherGETINTOUCH() {
        const h2Selector = 'h2.title.text-center';
        try {
            await utils.elementExists(this.page, h2Selector);
            console.log('Element found: Get In Touch');
            
        } catch (error) {
            console.error(error.message);
        }
    }

    async fillContactUsForm(nameOfUser) {
        const nameInput = 'input[data-qa="name"]';
        const emailInput = 'input[name="email"]'
        try {
            await utils.provideTextToField(this.page, nameInput, nameOfUser);
        } catch (error) {
            console.error('Failed to provide text to input field:', error);
        }
        utils.getEmailFromFile().then(async (email) => {
            await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
            try {
                await utils.provideTextToField(this.page, emailInput, email);
                await this.page.pause();
            } catch (error) {
                console.error('Failed to provide text to input field:', error);
            }
        })
    }
    //await this.page.pause();

}