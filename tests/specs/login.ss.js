const { Builder } = require('selenium-webdriver');
const LoginAction = require('../actions/login.action');
const SharingAction = require('../actions/sharing.action');
const LoginPage = require('../pageobjects/login.page')

describe('Login', function () {
    let driver; 
    let loginAction;
    let sharingAction

    beforeEach(async function () {
        driver = new Builder()
            .forBrowser('chrome')
            .build();

        loginAction = new LoginAction(driver);
        sharingAction= new SharingAction(driver);
        await loginAction.openUrl('https://www.saucedemo.com/');
    });

    afterEach(async function () {
        await driver.quit();
    });

    it('Login with valid user', async function () {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginSuccess('Products');

        await sharingAction.fullPageScreenshot('login_positive');
    });

    it('Login with laggy user', async function () {
        await loginAction.inputUsername('performance_glitch_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginSuccess('Products');

        await sharingAction.fullPageScreenshot('login_positive_laggy');
    });

    it('Login with wrong password', async function () {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('lama_lama_ketagihan');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');

        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_wrong_password');
    });

    it('Login with wrong username', async function () {
        await loginAction.inputUsername('awalnya_saya_coba_coba');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');

        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_wrong_username');
    });

    it('Login with locked user', async function () {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Sorry, this user has been locked out.');

        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_locked_user');
    })

    it('Login without input anything', async function () {
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username is required');

        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_empty_field');
    });

    it('Login without input username', async function () {
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username is required');

        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_empty_username');
    });

    it('Login without input password', async function () {
        await loginAction.inputUsername('standard_user');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Password is required');
        
        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_empty_password');
    });
})