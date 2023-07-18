import { expect, test } from "@playwright/test";
import utils from "./utils/utilsMethods";
import { HomePageEcommerce } from "./pages/ecommerceHomePage";
import { BrowserSetup } from "./utils/browserSetup";
import { LoggedUserPage } from "./pages/ecommerceLoggedUserPage";
import { ExpectedResults } from "./utils/expectedResults";


test.describe("Registration and login tests", async () => {

    let homePageEcommerce: HomePageEcommerce;
    let loggedUserPage: LoggedUserPage;
    let expectedResults: ExpectedResults;

    test.beforeEach(async () => {
        await BrowserSetup.initialize();
        const page = BrowserSetup.getPage();
        homePageEcommerce = new HomePageEcommerce(page);
        loggedUserPage = new LoggedUserPage(page);
        await homePageEcommerce.open();
    });

    test("Registration account - positive path", async () => {
        await homePageEcommerce.clickOnRegister();
        await homePageEcommerce.fillRegistrationForm("User", "Test");
        await homePageEcommerce.markConsents();
        await homePageEcommerce.clickOnContinueButton();

    })

    test("Registration account - negative path lack of confirmation password", async () => {
        await homePageEcommerce.clickOnRegister();
        await homePageEcommerce.fillRegistrationFormWithoutConfirmationOfPassword("User", "Test");
        await homePageEcommerce.markConsents();
        await homePageEcommerce.clickOnContinueButton();
        await homePageEcommerce.vaildationFieldInRegisterForm("Password confirmation does not match password!");
    })

    test("Registration account - verification of messages when each field is empty", async () => {
        expectedResults = new ExpectedResults();
        const locator = "div.text-danger"
        await homePageEcommerce.clickOnRegister();
        await homePageEcommerce.markConsents();
        await homePageEcommerce.clickOnContinueButton();
        await homePageEcommerce.getTextFromElementsAndStoreInList(locator)
        await homePageEcommerce.clickOnContinueButton();
        const promise: Promise<string[]> = homePageEcommerce.getTextFromElementsAndStoreInList(locator);
        const actualMessages: string[] = await promise;
        console.log(actualMessages);
        expect(actualMessages).toEqual(expectedResults.getList());               
    })



    test("Login based on registered emails test - positive path", async () => {
        await homePageEcommerce.clickOnLogin();
        await homePageEcommerce.enterEmailAndPassword();
        await homePageEcommerce.clickOnLoginButton();
        await loggedUserPage.assertWhetherUserIsCorrectlyLogged();
    })
})



