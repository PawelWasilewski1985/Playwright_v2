import { expect, test } from "@playwright/test";
import { BrowserSetup } from "./utils/browserSetup";
import { AutomationExerciseHomePage } from "./pages/automationExercisePage";
import { AutomationExerciseRegistrationLoginPage } from "./pages/automationExerciseRegistrationLoginPage";
import { AutomationExerciseRegistrationFormPage } from "./pages/automationExerciseRegistrationFormPage";
/*
TC.1
1. Launch browser --> OK
2. Navigate to url 'http://automationexercise.com' --> OK
3. Verify that home page is visible successfully --> OK
4. Click on 'Signup / Login' button --> OK
5. Verify 'New User Signup!' is visible --> OK
6. Enter name and email address --> OK
7. Click 'Signup' button --> OK
8. Verify that 'ENTER ACCOUNT INFORMATION' is visible --> OK
9. Fill details: Title, Name, Email, Password, Date of birth --> OK
10. Select checkbox 'Sign up for our newsletter!' --> OK
11. Select checkbox 'Receive special offers from our partners!' --> OK
12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number --> OK
13. Click 'Create Account button' --> 
14. Verify that 'ACCOUNT CREATED!' is visible
15. Click 'Continue' button
16. Verify that 'Logged in as username' is visible
17. Click 'Delete Account' button
18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
*/
test.describe("Automation Exercise", async () => {

    let automationExerciseHomePage: AutomationExerciseHomePage;
    let automationExerciseRegistrationLoginPage: AutomationExerciseRegistrationLoginPage; 
    let automationExerciseRegistrationFormPage: AutomationExerciseRegistrationFormPage;

    test.beforeEach(async () => {
        await BrowserSetup.initialize();
        const page = BrowserSetup.getPage();
        automationExerciseHomePage = new AutomationExerciseHomePage(page);
        automationExerciseRegistrationLoginPage = new AutomationExerciseRegistrationLoginPage(page);
        automationExerciseRegistrationFormPage = new AutomationExerciseRegistrationFormPage(page);
        await automationExerciseHomePage.openPage();
    });
//getByLabel('Email *')
    test("TC.1.", async () => {
        await automationExerciseHomePage.verifyThatHomePageIsVisibleSuccessfully();
        await automationExerciseHomePage.clickOnSignupLoginButton();
        await automationExerciseHomePage.checkWhetherRegisterFormTitleISVisible();
        await automationExerciseRegistrationLoginPage.provideNameInRegistrationSection("User");
        await automationExerciseRegistrationLoginPage.provideEmailInRegistrationSection("useremail")
        await automationExerciseRegistrationLoginPage.clickOnSignUpButton();
        await automationExerciseRegistrationFormPage.checkWhetherRegistrationFormIsVisible();
        await automationExerciseRegistrationFormPage.fillRegistrationForm("United States")
        
    })
})