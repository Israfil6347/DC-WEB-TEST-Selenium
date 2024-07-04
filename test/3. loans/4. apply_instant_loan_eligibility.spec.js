const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Apply for instance loan", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened apply instant loan page correctly", async function () {
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

      // TODO : opened instant loan term and condition

       it("opened instant loan term and condition", async function () {
        const InstantLoan = await driver.findElement(By.id("InstantLoan"));
        assert.notEqual(InstantLoan, null);
        await InstantLoan.click();
        await driver.sleep(2000);
      });

      // TODO : has accept button
      it("has accept button", async function () {
        const AcceptButton = await driver.findElement(By.id("closeOrRejectTermsAndConditionsDialogAccept"));
        const AcceptButtonTag = await AcceptButton.getTagName();
        assert.equal(AcceptButtonTag, "button");
      });
      // TODO : has reject button
      it("has reject button", async function () {
        const closeButton = await driver.findElement(By.id("closeOrRejectTermsAndConditionsDialogDecline"));
        const closeButtonTag = await closeButton.getTagName();
        assert.equal(closeButtonTag, "button");
      });

      it("instant Loan Apply dialog open",async function(){
        const AcceptButton = await driver.findElement(By.id("closeOrRejectTermsAndConditionsDialogAccept"));
        await AcceptButton.click();
         await driver.sleep(2000);

        const LoanAmountRules = await driver.findElement(By.id("LoanAmountRules"));
        assert.notEqual(LoanAmountRules, null);
      })

      it("has enter between eligible amount",async function(){
        const AppliedAmount = await driver.findElement(
          By.id("AppliedAmount")
        );
        const AppliedAmountTag = await AppliedAmount.getTagName();
        assert.equal(AppliedAmountTag, "input");
      })

      it("has back button", async function () {
        const BackButton = await driver.findElement(By.id("handleBack")).getText();
        assert.equal(BackButton, "BACK");
      });

      it("has next button", async function () {
        const nextButton = await driver.findElement(By.id("CardPin")).getText();
        assert.equal(nextButton, "NEXT");
      });

      it("has validation error in Please enter amount.", async function () {
        const nextButton = await driver.findElement(By.id("CardPin"))
        await nextButton.click();

        const ErrorText = await driver.findElement(By.id("error_AppliedAmount")).getText();
        assert.equal(
          ErrorText,
          "Please enter amount."
        );
      });

      it("has validation error in Amount must be multiplied by 500/-", async function () {
          const AppliedAmount = await driver.findElement(
          By.id("AppliedAmount")
        );
        await AppliedAmount.clear();
        await AppliedAmount.sendKeys("12");
        await driver.sleep(2000);

        const ErrorText = await driver.findElement(By.id("error_AppliedAmount")).getText();
        assert.equal(
          ErrorText,
          "Amount must be multiplied by 500 /-"
        );
      });
      
      it("has validation error in Amount must be less then upper limit", async function () {
        const AppliedAmount = await driver.findElement(By.id("AppliedAmount"));
        await AppliedAmount.clear();
        await AppliedAmount.sendKeys("41000");
        await driver.sleep(2000);

        const ErrorText = await driver.findElement(By.id("error_AppliedAmount")).getText();
        assert.notEqual(ErrorText, null);
      });

      it("will open card pin section", async function () {
        const AppliedAmount = await driver.findElement(By.id("AppliedAmount"));
        await AppliedAmount.clear();
        await AppliedAmount.sendKeys("5000");
        await driver.sleep(2000);

        const nextButton = await driver.findElement(By.id("CardPin"));
        await nextButton.click();
        await driver.sleep(2000);
      });


      
    });
  },
  { browsers: [Browser.CHROME] }
);
