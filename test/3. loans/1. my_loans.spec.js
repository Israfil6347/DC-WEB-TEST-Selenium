const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("My Loans", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened my loans page correctly", async function () {
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
      });

      // TODO : has chart

      it("has loans", async function () {
        const familyMembers = await driver.findElements(
          By.className("myLoansResponseData")
        );
        assert.notEqual(familyMembers.length, 0);
      });

      it("has loan details", async function () {
        const myLoan = await driver.findElement(By.id("myLoans_0"));
        await myLoan.click();
        await driver.sleep(2000);

        const myLoanNumber = await driver
          .findElement(By.id("LoanNumber"))
          .getText();
        assert.notEqual(myLoanNumber, "");

        const leaneeName = await driver
          .findElement(By.id("LoanName"))
          .getText();

        assert.equal(leaneeName, process.env.REACT_APP_PERSON_NAME);
      });

    // TODO : has repayment button
      it("has repayment button", async function () {
        const repaymentButton = await driver.findElement(By.id("LoanPaymentCalculation"));
        const repaymentButtonTag = await repaymentButton.getTagName();
        assert.equal(repaymentButtonTag, "button");
      });
      // TODO : has surety taken button
      it("has surety taken button", async function () {
        const suretyTakenButton = await driver.findElement(By.id("LoanDetails"));
        const suretyTakenButtonTag = await suretyTakenButton.getTagName();
        assert.equal(suretyTakenButtonTag, "button");
      });
      // TODO : has statement button
      it("has statement button", async function () {
        const statementButton = await driver.findElement(By.id("loanStatement"));
        const statementButtonTag = await statementButton.getTagName();
        assert.equal(statementButtonTag, "button");
      });
      // TODO : has close button
      it("has close button", async function () {
        const closeButton = await driver.findElement(By.id("closeLoanDetails"));
        const closeButtonTag = await closeButton.getTagName();
        assert.equal(closeButtonTag, "button");
      });

      // TODO : opened repayment calculator

      it("opened repayment calculator", async function () {
        const repaymentButton = await driver.findElement(By.id("LoanPaymentCalculation"));
        await repaymentButton.click();
        await driver.sleep(2000);
      });

       it("has yes/no option", async function () {
        const closeButton = await driver.findElement(By.id("closeLoanDetails"));
        const closeButtonTag = await closeButton.getTagName();
        assert.equal(closeButtonTag, "button");
      });


   
      // TODO : has yes/no option
      
      it("has yes/no option", async function () {
        const yesInput = await driver.findElement(By.id("Yes"));
        const yesInputTag = await yesInput.getTagName();
        assert.equal(yesInputTag, "input");

        const noInput = await driver.findElement(By.id("no"));
        const noInputTag = await noInput.getTagName();
        assert.equal(noInputTag, "input");
      });


      // TODO : has installment amount input

      it("has installment amount input", async function () { 
        const noInput = await driver.findElement(By.id("no"));
         await noInput.click();
         await driver.sleep(2000);

        const installmentAmountInput = await driver.findElement(By.id("installmentAmount"));
        const installmentAmountInputTag = await installmentAmountInput.getTagName();
        assert.equal(installmentAmountInputTag, "input");
      });


      // TODO : has submit button

      it("has submit button", async function () {
        const SubmitRegularInstallmentButton = await driver.findElement(By.id("SubmitRegularInstallment"));
        const SubmitRegularInstallmentTag = await SubmitRegularInstallmentButton.getTagName();
        assert.equal(SubmitRegularInstallmentTag, "button");
      });
      
      // TODO : has cancel button

      it("has cancel button", async function () {
        const CancelRegularInstallmentButton = await driver.findElement(By.id("CancelRegularInstallment"));
        const CancelRegularInstallmentTag = await CancelRegularInstallmentButton.getTagName();
        assert.equal(CancelRegularInstallmentTag, "button");
      });

      // TODO : opened repayment calculation result

      it("opened repayment calculation result", async function () {
        const yesInput = await driver.findElement(By.id("Yes"));
        await yesInput.click();

        const SubmitRegularInstallmentButton = await driver.findElement(By.id("SubmitRegularInstallment"));
        await SubmitRegularInstallmentButton.click();
        await driver.sleep(2000);

        const CalculationOkButton = await driver.findElement(By.id("CalculationOkButton"));
        const CalculationOkButtonTag = await CalculationOkButton.getTagName();
        assert.equal(CalculationOkButtonTag, "button");
      });


      // TODO : has repayment calculation result details



      // TODO : has ok button
      it("has ok button", async function () {
        const CalculationOkButton = await driver.findElement(By.id("CalculationOkButton"));
        const CalculationOkButtonTag = await CalculationOkButton.getTagName();
        assert.equal(CalculationOkButtonTag, "button");
        await CalculationOkButton.click();
        await driver.sleep(2000);
      });

      // TODO : opened loan statement

       it("opened loan statement", async function () {
        const statementButton = await driver.findElement(By.id("loanStatement"));
        const statementButtonTag = await statementButton.getTagName();
        assert.equal(statementButtonTag, "button");
        await statementButton.click();
        await driver.sleep(2000);
      });
      // TODO : has statement rows


      // TODO : has close button

      it("has close button", async function () {
        const LoanStatementCloseButton = await driver.findElement(By.id("LoanStatementClose"));
        const LoanStatementCloseButtonTag = await LoanStatementCloseButton.getTagName();
        assert.equal(LoanStatementCloseButtonTag, "button");
        await LoanStatementCloseButton.click();
        await driver.sleep(2000);
      });

      // TODO : opened taken surety page
      it("opened taken surety page", async function () {
        const suretyTakenButton = await driver.findElement(By.id("LoanDetails"));
        const suretyTakenButtonTag = await suretyTakenButton.getTagName();
        assert.equal(suretyTakenButtonTag, "button");
        await suretyTakenButton.click();
        await driver.sleep(2000);
      });

      // TODO : has taken sureties

      it("has taken sureties", async function () {
        const myLoanSuretyTaken = await driver.findElement(By.id("loanSuretyTakenResponse_0"));
        await myLoanSuretyTaken.click();
        await driver.sleep(2000);
      });
      // TODO : opened surety details page

      it("opened surety details page", async function () {
        const myLoanSuretyTaken = await driver.findElement(By.id("SuretyDetailsAccountNo"));
        assert.notEqual(myLoanSuretyTaken, null);
      });
      // TODO : has taken surety details
      // TODO : has close button
       it("has close button", async function () {
        const CloseSuretyDetailsButton = await driver.findElement(By.id("CloseSuretyDetails"));
        const CloseSuretyDetailsButtonTag = await CloseSuretyDetailsButton.getTagName();
        assert.equal(CloseSuretyDetailsButtonTag, "button");
        await CloseSuretyDetailsButton.click();
        await driver.sleep(2000);
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
