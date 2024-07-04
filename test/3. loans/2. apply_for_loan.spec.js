const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Apply for loans", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened apply for loan page correctly", async function () {
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
        const menu = await driver.findElement(By.id("loans"));
        await menu.click();

        await driver.sleep(2000);
        const menuUrl =
          (await process.env.REACT_APP_BASE_URL) + "loans/my_loans";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, menuUrl);

        const openAccountMenu = await driver.findElement(
          By.id("apply_for_loan")
        );
        await openAccountMenu.click();

        await driver.sleep(2000);
        const openAccountUrl =
          (await process.env.REACT_APP_BASE_URL) + "loans/apply_for_loan";
        let currentUrl2 = await driver.getCurrentUrl();

        assert.equal(currentUrl2, openAccountUrl);
      });

      // TODO : has apply for Instant Loan option
      it("has apply for Instant Loan option", async function () {
        const InstantLoan = await driver.findElement(By.id("InstantLoan"));
        assert.notEqual(InstantLoan, null);
      });

      // TODO : has apply for Deposit Loan option

      it("has apply for Deposit Loan option", async function () {
        const LoanAgainstDeposits = await driver.findElement(By.id("LoanAgainstDeposits"));
        assert.notEqual(LoanAgainstDeposits, null);
      });

      // TODO : has apply for general Loan option
      it("has apply for general Loan option", async function () {
        const GeneralLoan = await driver.findElement(By.id("GeneralLoan"));
        assert.notEqual(GeneralLoan, null);
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
