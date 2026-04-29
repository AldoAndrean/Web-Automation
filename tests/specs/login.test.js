const { Builder } = require('selenium-webdriver');
const LoginAction = require('../actions/login.action');
const { compareScreenshot } = require('../../utilities/visual_regression.helper')

describe('Login', function () {
    let driver; 
    let loginAction;

    beforeEach(async function () {
        driver = new Builder()
            .forBrowser('chrome')
            .build();

        loginAction = new LoginAction(driver);
        await loginAction.openUrl('https://www.saucedemo.com/');
    })

    afterEach(async function () {
        await driver.quit();
    })

    it('Login with valid user', async function () {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginSuccess('Products');

        await driver.sleep(1000);
        await compareScreenshot(driver, 'positive_valid_user_product_page');
    });

    it('Login with laggy user', async function () {
        await loginAction.inputUsername('performance_glitch_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginSuccess('Products');

        await driver.sleep(1000);
        await compareScreenshot(driver, 'positive_laggy_user_product_page');
    });

    it('Login with wrong password', async function () {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('lama_lama_ketagihan');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');

        await driver.sleep(1000);
        await compareScreenshot(driver, 'negative_wrong_password');
    })

    it('Login with wrong username', async function () {
        await loginAction.inputUsername('awalnya_saya_coba_coba');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');

        await driver.sleep(1000);
        await compareScreenshot(driver, 'negative_wrong_username');
    })

    it('Login with locked user', async function () {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Sorry, this user has been locked out.');

        await driver.sleep(1000);
        await compareScreenshot(driver, 'negative_locked_user');
    })

    it('Login without input anything', async function () {
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username is required');

        await driver.sleep(1000);
        await compareScreenshot(driver, 'negative_empty_field');
    });

    it('Login without input username', async function () {
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username is required');

        await driver.sleep(1000);
        await compareScreenshot(driver, 'negative_empty_username');
    });

    it('Login without input password', async function () {
        await loginAction.inputUsername('standard_user');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Password is required');
        
        await driver.sleep(1000);
        await compareScreenshot(driver, 'negative_empty_password');
    });
})