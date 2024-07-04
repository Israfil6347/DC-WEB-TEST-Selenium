const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Apply for deposit loan", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened deposit loan page correctly", async function () {
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
      // TODO : opened deposit loan term and condition

      it("opened deposit loan term and condition", async function () {
        const LoanAgainstDeposits = await driver.findElement(
          By.id("LoanAgainstDeposits")
        );
        await LoanAgainstDeposits.click();
        await driver.sleep(2000);

        const title = await driver.findElement(By.id("title")).getText();
        assert.equal(title, "ডিপোজিট লোনের নীতিমালা");
      });
      // TODO : has accept button
      it("has accept button", async function () {
        const AcceptButton = await driver.findElement(
          By.id("closeOrRejectTermsAndConditionsDialogAccept")
        );
        const AcceptButtonTag = await AcceptButton.getTagName();
        assert.equal(AcceptButtonTag, "button");
      });
      // TODO : has reject button
      it("has reject button", async function () {
        const closeButton = await driver.findElement(
          By.id("closeOrRejectTermsAndConditionsDialogDecline")
        );
        const closeButtonTag = await closeButton.getTagName();
        assert.equal(closeButtonTag, "button");
      });

      it("has open deposit loan Items", async function () {
        const AcceptButton = await driver.findElement(
          By.id("closeOrRejectTermsAndConditionsDialogAccept")
        );
        await AcceptButton.click();
        await driver.sleep(4000);
      });

      it("has open deposit loan  Items and apply option", async function () {
        const LoanItem = await driver.findElement(
          By.id("eligibleLoanProducts_0")
        );
        await LoanItem.click();
        await driver.sleep(2000);

        const myLoanName = await driver
          .findElement(By.id("LoanProductName"))
          .getText();
        assert.notEqual(myLoanName, "");
      });

      it("has open Deposit Loan Application Form", async function () {
        const ApplyButton = await driver.findElement(By.id("applyLoan"));
        await ApplyButton.click();
        await driver.sleep(3000);

        const selectedAccountInput = await driver.findElement(
          By.id("isSelectedAccount_0")
        );
        const selectedAccountInputTag = await selectedAccountInput.getTagName();
        assert.equal(selectedAccountInputTag, "input");
      });
      it("has selected account Checkbox", async function () {
        const selectedAccountInput = await driver.findElement(
          By.id("isSelectedAccount_0")
        );
        const selectedAccountInputTag = await selectedAccountInput.getTagName();
        assert.equal(selectedAccountInputTag, "input");
      });
      it("has selected account input", async function () {
        const selectedAccountInputAmount = await driver.findElement(
          By.id("PartialApplyLoan_0")
        );
        const selectedAccountInputAmountTag =
          await selectedAccountInputAmount.getTagName();
        assert.equal(selectedAccountInputAmountTag, "input");
      });
    

      it("has find execute list and will show validation error ", async function () {
        
        const loanableBalances = await driver.findElements(
          By.className("loanableBalance")
        );

        // console.log(loanableBalances.length);

        let selectedIndex = -1;
        for (let i = 0; i < loanableBalances.length; i++) {
          const amountText = await loanableBalances[i].getText();
          // console.log(amountText);
          const amount = parseFloat(
            amountText.replace("৳", "").replace(",", "")
          );
          
          if (amount > 1000) {
            selectedIndex = i;
            break;
          }
        }
        // console.log(selectedIndex);
        if (selectedIndex > -1) {
          const selectedAccountInput = await driver.findElement(
          By.id(`isSelectedAccount_${selectedIndex}`))
          await selectedAccountInput.click();
          await driver.sleep(2000);


          const selectedAccountInputAmount = await driver.findElement(
            By.id(`PartialApplyLoan_${selectedIndex}`)
          );
          await selectedAccountInputAmount.clear();
          await selectedAccountInputAmount.sendKeys("0");

                await driver.sleep(2000);

        const ErrorText = await driver
          .findElement(By.id(`error_PartialApplyLoan_${selectedIndex}`))
          .getText();
        assert.equal(ErrorText, "Please enter valid amount");

        await selectedAccountInputAmount.clear();
        await selectedAccountInputAmount.sendKeys("12");

        const AmountErrorText = await driver
          .findElement(By.id(`error_PartialApplyLoan_${selectedIndex}`))
          .getText();
        assert.equal(AmountErrorText, "Amount must be multiplied by 1000 /-");
        
        await selectedAccountInputAmount.clear();
        await selectedAccountInputAmount.sendKeys("1000");
         await driver.sleep(2000);
          // console.log(loanableBalances[selectedIndex]);
          // Todo
        }
        return null;
      });

      it("has next button", async function () {
        const AcceptButton = await driver.findElement(By.id("productLoan"));
        const AcceptButtonTag = await AcceptButton.getTagName();
        assert.equal(AcceptButtonTag, "button");
      });
      // TODO : has back button
      it("has back button", async function () {
        const closeButton = await driver.findElement(By.id("handleBack"));
        const closeButtonTag = await closeButton.getTagName();
        assert.equal(closeButtonTag, "button");
      });

      it("has open application details section",async function(){
          const AcceptButton = await driver.findElement(By.id("productLoan"));
          await AcceptButton.click();
          await driver.sleep(2000);
      })

      // it("has accept maximum loan amount", async function () {
      //   const AcceptButton = await driver.findElement(By.id("SecretKey"));
      //   const AcceptButtonTag = await AcceptButton.getTagName();
      //   assert.equal(AcceptButtonTag, "input");
      // });

      it("has Maximum Loan Amount", async function () {
        const AcceptButton = await driver.findElement(By.id("MaximumLoanAmount"));
        const AcceptButtonTag = await AcceptButton.getTagName();
        assert.equal(AcceptButtonTag, "input");
      });
      
      it("has Maximum Loan Amount", async function () {
        const AcceptButton = await driver.findElement(By.id("InterestRate"));
        const AcceptButtonTag = await AcceptButton.getTagName();
        assert.equal(AcceptButtonTag, "input");
      });

      it("has Number Of Installment dropdown and  data is selected", async function () {
        const selectOptionInput = driver.findElement(
          By.css("select[name=NumberOfInstallment]")
        );
        const select = new Select(selectOptionInput);
        const selectData = await driver.findElement(By.id("NumberOfInstallment_0"));
        await select.selectByValue("12");
        assert.equal(true, await selectData.isSelected());
        await driver.sleep(3000);
      });

      it("has Maximum Loan Amount", async function () {
        const AcceptButton = await driver.findElement(By.id("ApplyLoanAmount"));
        const AcceptButtonTag = await AcceptButton.getTagName();
        assert.equal(AcceptButtonTag, "input");
      });

      it("will open card pin section",async function (){
        const nextButton = await driver.findElement(By.id("productLoan"));
        await nextButton.click()
        await driver.sleep(2000);

        const CardPINInput = await driver.findElement(By.id("CardPIN"));
        const CardPINInputTag = await CardPINInput.getTagName();
        assert.equal(CardPINInputTag, "input");
              
      })

       it("has card pin input", async function () {
        const CardPINInput = await driver.findElement(By.id("CardPIN"));
        const CardPINInputTag = await CardPINInput.getTagName();
        assert.equal(CardPINInputTag, "input");

        await CardPINInput.sendKeys("1234");
        await driver.sleep(2000);
      });

      it("has agreement accept input", async function () {
        const AcceptInput = await driver.findElement(By.id("AgreementAccept"));
        const AcceptInputTag = await AcceptInput.getTagName();
        assert.equal(AcceptInputTag, "input");
        await AcceptInput.click();
        await driver.sleep(2000);

        const AcceptButton = await driver.findElement(By.id("productLoan"));
        await AcceptButton.click();
        await driver.sleep(2000);

      });
    });
  },
  { browsers: [Browser.CHROME] }
);
