const { suite } = require("selenium-webdriver/testing");
const { Browser, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("My Info", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened my info correctly", async function () {
        await driver.get(process.env.REACT_APP_BASE_URL);
        await driver.sleep(2000);

        const memberLoginButton = await driver.findElement(
          By.id("MemberLogin")
        );
        await memberLoginButton.click();
        await driver.sleep(1000);

        const userNameInput = await driver.findElement(By.id("username"));
        await userNameInput.sendKeys(await process.env.REACT_APP_USER_ID);

        const passwordInput = await driver.findElement(By.id("userPass"));
        await passwordInput.sendKeys(await process.env.REACT_APP_USER_PASSWORD);

        const loginButton = await driver.findElement(By.id("submit"));
        await loginButton.click();

        await driver.sleep(2000);

        let currentUrl = await driver.getCurrentUrl();
        const myInfoUrl =
          (await process.env.REACT_APP_BASE_URL) + "info/my_info";

        assert.equal(currentUrl, myInfoUrl);
        await driver.sleep(2000);
      });

      it("has person name", async function () {
        const userName = await driver.findElement(By.id("userName"));
        const userNameText = await userName.getText();
        assert.equal(userNameText, process.env.REACT_APP_PERSON_NAME);
      });

      it("has persons email", async function () {
        const personEmail = await driver.findElement(By.id("email"));
        const personEmailText = await personEmail.getText();
        assert.equal(personEmailText, process.env.REACT_APP_USER_EMAIL);
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
