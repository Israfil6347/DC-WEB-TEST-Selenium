const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Deposit request status", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened deposit request status page correctly", async function () {
        await driver.get(process.env.REACT_APP_BASE_URL);
        await driver.sleep(2000);

        const memberLoginButton = await driver.findElement(
          By.id("MemberLogin")
        );
        await memberLoginButton.click();
        await driver.sleep(2000);

        const userNameInput = await driver.findElement(By.id("username"));
        await userNameInput.sendKeys(await process.env.REACT_APP_USER_ID);

        const passwordInput = await driver.findElement(By.id("userPass"));
        await passwordInput.sendKeys(await process.env.REACT_APP_USER_PASSWORD);

        const loginButton = await driver.findElement(By.id("submit"));
        await loginButton.click();

        await driver.sleep(2000);
        const menu = await driver.findElement(By.id("deposits"));
        await menu.click();

        await driver.sleep(2000);
        const menuUrl =
          (await process.env.REACT_APP_BASE_URL) + "deposits/deposit_now";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, menuUrl);

        const openAccountMenu = await driver.findElement(
          By.id("deposit_request_status")
        );
        await openAccountMenu.click();

        await driver.sleep(2000);
        const openAccountUrl =
          (await process.env.REACT_APP_BASE_URL) +
          "deposits/deposit_request_status";
        let currentUrl2 = await driver.getCurrentUrl();

        assert.equal(currentUrl2, openAccountUrl);
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
