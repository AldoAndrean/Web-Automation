const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('SauceDemo', function () {
    let driver;

    it('Success Login', async function () {
    const options = new chrome.Options();
    options.addArguments('--incognito');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

            await driver.get('https://www.saucedemo.com');
            assert.strictEqual(await driver.getTitle(), 'Swag Labs');

            let inputUsername = await driver.findElement(By.xpath('//*[@data-test="username"]'));
            let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
            let buttonLogin = await driver.findElement(By.xpath('//*[@data-test="login-button"]'));

            await inputUsername.sendKeys('standard_user');
            await inputPassword.sendKeys('secret_sauce');
            await buttonLogin.click();

            const title = await driver.getTitle();
            assert.strictEqual(title, 'Swag Labs');
        
            await driver.quit();
        
    });

    it('Urutkan High to Low', async function () {
    const options = new chrome.Options();
    options.addArguments('--incognito');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

            await driver.get('https://www.saucedemo.com');

            let inputUsername = await driver.findElement(By.xpath('//*[@data-test="username"]'));
            let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
            let buttonLogin = await driver.findElement(By.xpath('//*[@data-test="login-button"]'));

            await inputUsername.sendKeys('standard_user');
            await inputPassword.sendKeys('secret_sauce');
            await buttonLogin.click();


            let dropdownSort = await driver.findElement(By.className('product_sort_container')).click();
            let option = await driver.findElement(By.css('option[value="hilo"]'));
            await option.click();
        
            const topItemName = await driver.findElement(By.className('inventory_item_name')).getText();
            assert.strictEqual(topItemName, 'Sauce Labs Fleece Jacket');
        
            await driver.quit();
        
    });
});
