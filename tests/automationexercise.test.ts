import { expect, test } from "@playwright/test";
import { BrowserSetup } from "./utils/browserSetup";
import { AutomationExerciseHomePage } from "./pages/automationExercisePage";
import { AutomationExerciseRegistrationLoginPage } from "./pages/automationExerciseRegistrationLoginPage";
import { AutomationExerciseRegistrationFormPage } from "./pages/automationExerciseRegistrationFormPage";
import { AfterRegisterPage } from "./pages/afterRegisterPage";
import { AfterLoginPage } from "./pages/afterLoginPage";
import { ContactUsPage } from "./pages/contactUsPage";
import Utils from "./utils/utilsMethods";


test.describe("Automation Exercise", async () => {
    let automationExerciseHomePage: AutomationExerciseHomePage;
    let automationExerciseRegistrationLoginPage: AutomationExerciseRegistrationLoginPage;
    let automationExerciseRegistrationFormPage: AutomationExerciseRegistrationFormPage;
    let afterRegisterPage: AfterRegisterPage;
    let afterLoginPage: AfterLoginPage;
    let contacUsPage: ContactUsPage;

    let page;
    test.beforeEach(async () => {
        await BrowserSetup.initialize();
        page = BrowserSetup.getPage();
        automationExerciseHomePage = new AutomationExerciseHomePage(page);
        automationExerciseRegistrationLoginPage = new AutomationExerciseRegistrationLoginPage(page);
        automationExerciseRegistrationFormPage = new AutomationExerciseRegistrationFormPage(page);
        afterRegisterPage = new AfterRegisterPage(page);
        afterLoginPage = new AfterLoginPage(page);
        contacUsPage = new ContactUsPage(page);
        await automationExerciseHomePage.openPage();
    });
    /*
        Test Case 1: Register User
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
        13. Click 'Create Account button' --> OK
        14. Verify that 'ACCOUNT CREATED!' is visible --> OK
        15. Click 'Continue' button -- OK 
        16. Verify that 'Logged in as username' is visible --> OK
        17. Click 'Delete Account' button --> 
        18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    */
    test("TC.1.Register User with deleting account", async () => {
        await automationExerciseHomePage.verifyThatHomePageIsVisibleSuccessfully();
        await automationExerciseHomePage.clickOnSignupLoginButton();
        await automationExerciseHomePage.checkWhetherRegisterFormTitleISVisible();
        await automationExerciseRegistrationLoginPage.provideNameInRegistrationSection("User");
        await automationExerciseRegistrationLoginPage.provideRandomEmailInRegistrationSection("useremail");
        await automationExerciseRegistrationLoginPage.clickOnSignUpButton();
        await automationExerciseRegistrationFormPage.checkWhetherRegistrationFormIsVisible();
        await automationExerciseRegistrationFormPage.fillRegistrationForm("United States");
        await afterRegisterPage.assertIfAccountIsCreated("Account Created!");
        await afterRegisterPage.clickOnContinueButton();
        await afterRegisterPage.checkWheteherUserIsLogged();
        // await afterRegisterPage.clickOnDeleteAccount();
        // await afterRegisterPage.checkIfAccountIsDeleted();
        // await afterRegisterPage.clickOnContinueButton();

    })
    /*
        Test Case 2: Login User with correct email and password
        1. Launch browser --> ok
        2. Navigate to url 'http://automationexercise.com' --> ok
        3. Verify that home page is visible successfully --> ok
        4. Click on 'Signup / Login' button --> ok
        5. Verify 'Login to your account' is visible --> ok
        6. Enter correct email address and password --> ok
        7. Click 'login' button --> ok
        8. Verify that 'Logged in as username' is visible
        9. Click 'Delete Account' button
        10. Verify that 'ACCOUNT DELETED!' is visible
    */
    test("TC.2 Login user with correct email and password", async () => {
        await automationExerciseHomePage.verifyThatHomePageIsVisibleSuccessfully();
        await automationExerciseHomePage.clickOnSignupLoginButton();
        await automationExerciseHomePage.checkWhetherLoginFormTitleISVisible();
        await automationExerciseHomePage.enterEmailAndPassword();
        await automationExerciseHomePage.clickOnLoginButton();
        await afterRegisterPage.checkWheteherUserIsLogged();
        // await afterRegisterPage.clickOnDeleteAccount();
        // await afterRegisterPage.checkIfAccountIsDeleted();
    })
    /*
        Test Case 3: Login User with incorrect email and password
        1. Launch browser --> OK
        2. Navigate to url 'http://automationexercise.com' --> OK
        3. Verify that home page is visible successfully --> OK
        4. Click on 'Signup / Login' button --> OK
        5. Verify 'Login to your account' is visible --> OK
        6. Enter incorrect email address and password --> OK
        7. Click 'login' button --> OK
        8. Verify error 'Your email or password is incorrect!' is visible --> OK
    */
    test("TC.3 Login user with incorrect email and password", async () => {
        await automationExerciseHomePage.verifyThatHomePageIsVisibleSuccessfully();
        await automationExerciseHomePage.clickOnSignupLoginButton();
        await automationExerciseHomePage.enterEmailAndPasswordWithParameters("incorrectemail@email.com", "incorrectPassword");
        await automationExerciseHomePage.clickOnLoginButton();
        await automationExerciseHomePage.checkWheteherUserIsNotLogged();
        await automationExerciseHomePage.checkIfTheTextAboutIncorrectLoginIsCorrectlyDisplayed();
    })
    /*
        Test Case 4: Logout User
        1. Launch browser --> OK
        2. Navigate to url 'http://automationexercise.com' --> OK
        3. Verify that home page is visible successfully --> OK
        4. Click on 'Signup / Login' button --> OK
        5. Verify 'Login to your account' is visible --> OK
        6. Enter correct email address and password --> OK
        7. Click 'login' button --> OK
        8. Verify that 'Logged in as username' is visible --> OK
        9. Click 'Logout' button --> OK
        10. Verify that user is navigated to login page --> OK
    */
    test("TC.4 Logout User", async () => {
        await automationExerciseHomePage.verifyThatHomePageIsVisibleSuccessfully();
        await automationExerciseHomePage.clickOnSignupLoginButton();
        await automationExerciseHomePage.checkWhetherLoginFormTitleISVisible();
        await automationExerciseHomePage.enterEmailAndPassword();
        await automationExerciseHomePage.clickOnLoginButton();
        await afterRegisterPage.checkWheteherUserIsLogged();
        await afterLoginPage.clickOnLogOutButton();
        await automationExerciseHomePage.verifyThatHomePageIsVisibleSuccessfully();
        console.log('Current page:', page);
        await Utils.assertURL(page, "https://automationexercise.com/login")
    })

    /*
         Test Case 5: Register User with existing email
         1. Launch browser --> OK
         2. Navigate to url 'http://automationexercise.com' --> OK  
         3. Verify that home page is visible successfully --> OK
         4. Click on 'Signup / Login' button --> OK
         5. Verify 'New User Signup!' is visible --> OK
         6. Enter name and already registered email address --> OK
         7. Click 'Signup' button --> OK
         8. Verify error 'Email Address already exist!' is visible --> OK
    */
    test("TC.5 Register User with existing email", async () => {
        await automationExerciseHomePage.verifyThatHomePageIsVisibleSuccessfully();
        await automationExerciseHomePage.clickOnSignupLoginButton();
        await automationExerciseHomePage.checkWhetherLoginFormTitleISVisible();
        await automationExerciseRegistrationLoginPage.provideNameInRegistrationSection("User");
        await automationExerciseRegistrationLoginPage.provideRandomEmailInRegistrationSection("useremailnkrg5@test.email");

    })

    /*
    Test Case 6: Contact Us Form
    1. Launch browser --> OK
    2. Navigate to url 'http://automationexercise.com' --> OK
    3. Verify that home page is visible successfully --> OK
    4. Click on 'Contact Us' button --> OK
    5. Verify 'GET IN TOUCH' is visible --> OK
    6. Enter name, email, subject and message
    7. Upload file
    8. Click 'Submit' button
    9. Click OK button
    10. Verify success message 'Success! Your details have been submitted successfully.' is visible
    11. Click 'Home' button and verify that landed to home page successfully
    */
    test("TC.6 Contact Us Form", async () => {
        await automationExerciseHomePage.verifyThatHomePageIsVisibleSuccessfully();
        await automationExerciseHomePage.clickOnContactUs();
        await contacUsPage.checkWhetherGETINTOUCH();
        await contacUsPage.fillContactUsForm("John Connor");
    })
})
