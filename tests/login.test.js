const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('Login Sauce Demo', function () {
    let driver;

    beforeEach(async function () {
        const options = new chrome.Options();
        options.addArguments('--headless');

        driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

        await driver.get('https://www.saucedemo.com');
    });

    afterEach(async function () {
        await driver.quit();
    })

    it('Login with user standard', async function () {
        await driver.get('https://www.saucedemo.com');
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();
        await driver.wait(until.elementLocated(By.className('title')),5000);
        const title = await driver.findElement(By.className('title')).getText();
        assert.strictEqual(title, 'Products');
    });

    it('Login with user visual', async function (){
    await driver.get('https://www.saucedemo.com');
    await driver.findElement(By.id('user-name')).sendKeys('visual_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.elementLocated(By.className('title')),5000);
    const title = await driver.findElement(By.className('title')).getText();
    assert.strictEqual(title, 'Products');
    });
    
    it('Login with user performance glich', async function () {
    await driver.get('https://www.saucedemo.com');
    await driver.findElement(By.id('user-name')).sendKeys('performance_glitch_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.elementLocated(By.className('title')),5000);
    const title = await driver.findElement(By.className('title')).getText();
    assert.strictEqual(title, 'Products');
    });

    it('Login with user problem', async function () {
    await driver.get('https://www.saucedemo.com');
    await driver.findElement(By.id('user-name')).sendKeys('problem_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.elementLocated(By.className('title')),5000);
    const title = await driver.findElement(By.className('title')).getText();
    assert.strictEqual(title, 'Products');
    });
    
})