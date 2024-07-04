const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Surety given to", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened surety given to page correctly", async function () {
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
        const menu = await driver.findElement(By.id("surety"));
        await menu.click();

        await driver.sleep(2000);
        const menuUrl =
          (await process.env.REACT_APP_BASE_URL) + "surety/surety_given";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, menuUrl);
      });

      // TODO : has given sureties
      it("has given sureties", async function () {
        const familyMembers = await driver.findElements(
          By.className("givenSureties")
        );
        assert.notEqual(familyMembers.length, 0);
      });
      
      // TODO : open given surety details

      it("open given surety details", async function () {
        const sureties = await driver.findElement(By.id("givenSureties_0"));
         await sureties.click();
        await driver.sleep(2000);
      });

      // TODO : has surety details

      it("has ok button", async function () {
        const OkButton = await driver.findElement(By.id("okButton"));
        const OkButtonTag = await OkButton.getTagName();
        assert.equal(OkButtonTag, "button");
      });
      // TODO : has ok button
    });
  },
  { browsers: [Browser.CHROME] }
);
