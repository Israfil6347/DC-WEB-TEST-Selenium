const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Cards", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened cards page correctly", async function () {
        await driver.get(process.env.REACT_APP_BASE_URL);
        await driver.sleep(2000);

        const memberLoginButton = await driver.findElement(
          By.id("MemberLogin")
        );
        const memberLoginButtonText = await memberLoginButton.getText();
        assert.equal(memberLoginButtonText, "Member Login");
        await memberLoginButton.click();
        await driver.sleep(1000);

        const userNameInput = await driver.findElement(By.id("username"));
        await userNameInput.sendKeys(await process.env.REACT_APP_USER_ID);

        const passwordInput = await driver.findElement(By.id("userPass"));
        await passwordInput.sendKeys(await process.env.REACT_APP_USER_PASSWORD);

        const loginButton = await driver.findElement(By.id("submit"));
        await loginButton.click();

        await driver.sleep(2000);
        const familyMenu = await driver.findElement(By.id("card"));
        await familyMenu.click();
        await driver.sleep(2000);
        const myInfoUrl = (await process.env.REACT_APP_BASE_URL) + "info/card";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, myInfoUrl);
        await driver.sleep(2000);
      });

      it("has card", async function () {
        const cardItems = await driver.findElement(By.className("cards")); // TODO : Class name should be 'cards'
        assert.notEqual(cardItems.length, 0);
      });

      it("has card type", async function () {
        const cardTypeElement = await driver.findElement(
          By.id("CardType") // TODO : id should be 'card_type_{0}' and index number
        );
        const cardTypeText = await cardTypeElement.getText();
        assert.equal(cardTypeText, process.env.REACT_APP_USER_CARD_TYPE);
      });

      it("has card number", async function () {
        const cardNoElement = await driver.findElement(
          By.id("CardNo") // TODO : index number
        );
        const cardNumberText = await cardNoElement.getText();
        assert.equal(cardNumberText, process.env.REACT_APP_USER_CARD_NUMBER);
      });

      it("has card holder name", async function () {
        const cardHolderElement = await driver.findElement(
          By.id("Name") // TODO : index number
        );
        const cardHolderText = await cardHolderElement.getText();
        assert.equal(cardHolderText, process.env.REACT_APP_PERSON_NAME);
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
