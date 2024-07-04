const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Open an account", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("has loaded open account page correctly", async function () {
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
        const menu = await driver.findElement(By.id("accounts"));
        await menu.click();

        await driver.sleep(2000);
        const menuUrl =
          (await process.env.REACT_APP_BASE_URL) + "accounts/my_accounts";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, menuUrl);

        const openAccountMenu = await driver.findElement(
          By.id("open_an_account")
        );
        await openAccountMenu.click();

        await driver.sleep(2000);
        const openAccountUrl =
          (await process.env.REACT_APP_BASE_URL) + "accounts/open_an_account";
        let currentUrl2 = await driver.getCurrentUrl();

        assert.equal(currentUrl2, openAccountUrl);
      });

      // TODO : has 11 account opening options

      // TODO : has long term savings deposit option
      // TODO : has apply button

      // TODO : has pension benefit scheme option
      // TODO : has apply button

      // TODO : has monthly savings project option
      // TODO : has apply button

      // TODO : has troimashik savings project option
      // TODO : has apply button

      // TODO : has aged savings project option
      // TODO : has apply button

      // TODO : has double deposit scheme project option
      // TODO : has apply button

      // TODO : has marriage deposit scheme option
      // TODO : has apply button

      // TODO : has millionaire deposit scheme option
      // TODO : has apply button

      // TODO : has kotipoti deposit scheme option
      // TODO : has apply button

      // TODO : has term deposit option
      // TODO : has apply button

      // TODO : has bond product option
      // TODO : has apply button
    });
  },
  { browsers: [Browser.CHROME] }
);
