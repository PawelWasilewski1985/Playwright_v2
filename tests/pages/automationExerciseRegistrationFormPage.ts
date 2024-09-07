import { Page, expect } from '@playwright/test';
import utils from "../utils/utilsMethods";


export class AutomationExerciseRegistrationFormPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async checkWhetherRegistrationFormIsVisible() {
        try {
            const registerFormInformation = await utils.isElementVisible(this.page, 'h2.title.text-center');
            console.log(`Element is visible: ${registerFormInformation}`);
        } catch (error) {
            console.error('Test failed:', error.message);
        }
        

        //expect(registerFormInformation).toBeTruthy();

    }

    async markGender_random() {
        const radioButtonsLocator = this.page.locator('input[type="radio"]');
        const numberOfRadioButtons = await utils.countElements(this.page, radioButtonsLocator);
        // Generate a random index within the range of available radio buttons
        const randomIndex = Math.floor(Math.random() * numberOfRadioButtons);
        // Click on the random radio button
        const randomRadioButton = radioButtonsLocator.nth(randomIndex);
        await randomRadioButton.click();


    }

    async fillRegistrationForm(country: string) {
        await this.markGender_random();
        await this.fillPassword();
        await this.checkAllCheckboxes();
        this.fillDateOfBirth_random();
        await this.provideFirstName();
        await this.provideLastName();
        await this.provideAddress();
        await this.selectCountry(country);
        await this.provideState();
        await this.provideCity();
        await this.provideZIPcode();
        await this.providePhoneNumber();
        await this.clickOnCreateAccount();
    }

    async provideFirstName() {
        const firstName = "Userfirstname" + utils.generateRandomNumber();
        await utils.provideTextToField(this.page, 'input[data-qa="first_name"]', firstName);

    }
    
    async clickOnCreateAccount() {
        await utils.findElementAndClick(this.page,'button[data-qa="create-account"]');
    }

    async provideLastName() {
        const lastName = "Userlastname" + utils.generateRandomNumber();
        await utils.provideTextToField(this.page, 'input[data-qa="last_name"]', lastName);
    }

    async provideAddress() {
        const address = "Street" + utils.generateRandomNumber() + "," + "11-100 New York";
        await utils.provideTextToField(this.page, 'input[data-qa="address"]', address);

    }
    async providePhoneNumber() {
        const phoneNumber = "999888111";
        await utils.provideTextToField(this.page, 'input[data-qa="mobile_number"]', phoneNumber);

    }
    

    async provideCity() {
        const city = "New York";
        await utils.provideTextToField(this.page, 'input[data-qa="city"]', city);
    }

    async provideState() {
        const state = "New York";
        await utils.provideTextToField(this.page, 'input[data-qa="state"]', state);
    }

    async fillPassword() {
        await this.page.getByLabel('Password *').fill("!QAZ2wsx");
    }

    async provideZIPcode() {
        const zipCode = "10011";
        await utils.provideTextToField(this.page, 'input[data-qa="zipcode"]', zipCode);
    }

    async selectCountry(country: string) {
        const countryDropDown = 'select[data-qa="country"]';
        await this.page.selectOption(countryDropDown, country);
    }

    async fillDateOfBirth_random() {
        const dropdownDays = this.page.locator('select[data-qa="days"]');
        const dropdownMonths = this.page.locator('select[data-qa="months"]');
        const dropdownYears = this.page.locator('select[data-qa="years"]')
        const daysCount = await dropdownDays.locator('option').count();
        const monthsCount = await dropdownMonths.locator('option').count();
        const yearsCount = await dropdownYears.locator('option').count();
        const randomDay = utils.generateRandomNumberWithoutLastAndWithoutFirst(daysCount, 11, 1)
        const randomMonth = utils.generateRandomNumberFromListOf(monthsCount)
        const randomYear = utils.generateRandomNumberWithoutLastAndWithoutFirst(yearsCount, 30, 20)
        await dropdownDays.selectOption({ index: randomDay });
        await dropdownMonths.selectOption({ index: randomMonth });
        await dropdownYears.selectOption({ index: randomYear })

    }

    async checkAllCheckboxes() {
        const checkboxes = await this.page.$$('[type="checkbox"]');

        for (const checkbox of checkboxes) {
            await checkbox.check();
        }

    }

}


//const randomIndex = Math.floor(Math.random() * (daysCount - 11)) + 1;
  // const days = this.page.locator('select[data-qa="days"]');
        // await days.click();
        // const day = days.locator('option[value]');
        // const allDays = await day.count();
        // console.log("All displayed days equal " + allDays);

        // for (let i = 0; i < allDays; i++) {
        //     const option = await day.nth(i).innerText();
        //     console.log("Day " + (i + 1) + ": " + option);
        //   }

