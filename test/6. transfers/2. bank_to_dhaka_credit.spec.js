const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Bank to Dhaka Credit", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened bank to Dhaka Credit page correctly", async function () {
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
        const menu = await driver.findElement(By.id("transfer"));
        await menu.click();

        await driver.sleep(2000);
        const menuUrl =
          (await process.env.REACT_APP_BASE_URL) +
          "transfer/transfer_within_dhaka_credit";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, menuUrl);

        const openAccountMenu = await driver.findElement(By.id("deposit_bank"));
        await openAccountMenu.click();

        await driver.sleep(2000);
        const openAccountUrl =
          (await process.env.REACT_APP_BASE_URL) + "transfer/deposit_bank";
        let currentUrl2 = await driver.getCurrentUrl();

        assert.equal(currentUrl2, openAccountUrl);
      });

      it("has bank account number input", async function () {
        const BankAccountNumberInput = await driver.findElement(
          By.id("BankAccountNumber")
        );
        const BankAccountNumberInputTag =
          await BankAccountNumberInput.getTagName();
        assert.equal(BankAccountNumberInputTag, "input");
      });

      it("has bank routing number input", async function () {
        const BankRoutingNumberInput = await driver.findElement(
          By.id("BankRoutingNumber")
        );
        const BankRoutingNumberTag = await BankRoutingNumberInput.getTagName();
        assert.equal(BankRoutingNumberTag, "input");
      });

      it("has transaction number input", async function () {
        const TransactionNumberInput = await driver.findElement(
          By.id("TransactionNumber")
        );
        const TransactionNumberInputTag =
          await TransactionNumberInput.getTagName();
        assert.equal(TransactionNumberInputTag, "input");
      });

      it("has sent amount input", async function () {
        const SentAmountInput = await driver.findElement(By.id("SentAmount"));
        const SentAmountInputTag = await SentAmountInput.getTagName();
        assert.equal(SentAmountInputTag, "input");
      });

      it("has transaction receipt input", async function () {
        const TransactionReceiptInput = await driver.findElement(
          By.id("TransactionReceipt")
        );
        const SentAmountInputTag = await TransactionReceiptInput.getTagName();
        assert.equal(SentAmountInputTag, "input");
      });

      it("has Remarks input", async function () {
        const TransactionReceiptInput = await driver.findElement(
          By.id("Remarks")
        );
        const SentAmountInputTag = await TransactionReceiptInput.getTagName();
        assert.equal(SentAmountInputTag, "textarea");
      });

      it("has back button", async function () {
        const signupButton = await driver
          .findElement(By.id("handleBack"))
          .getText();
        assert.equal(signupButton, "BACK");
      });

      it("has next button", async function () {
        const nextButton = await driver
          .findElement(By.id("verifyPINRequestHandler"))
          .getText();
        assert.equal(nextButton, "NEXT");
      });

      it("will show validation error", async function () {
        const nextButton = await driver.findElement(
          By.id("verifyPINRequestHandler")
        );
        await nextButton.click();
        await driver.sleep(2000);

        const BankNameErrorText = await driver
          .findElement(By.id("error_BankNameId"))
          .getText();
        assert.equal(BankNameErrorText, "Please select a bank");
      });

      it("will show validation error", async function () {
        const ErrorTransactionNumberText = await driver
          .findElement(By.id("error_TransactionNumber"))
          .getText();
        assert.equal(
          ErrorTransactionNumberText,
          "Please enter transaction number"
        );
      });

      it("has bank name dropdown", async function () {
        const selectOptionInput = driver.findElement(
          By.css("select[name=BankName]")
        );
        const select = new Select(selectOptionInput);
        const BankName = await driver.findElement(
          By.css(`option[value='One Bank Ltd.']`)
        );
        await select.selectByValue("One Bank Ltd.");
        assert.equal(true, await BankName.isSelected());
      });

      it("has enter recept name", async function () {
        const TransactionNumber = await driver.findElement(
          By.id("TransactionNumber")
        );
        await TransactionNumber.clear();
        const TransactionNumberTag = await TransactionNumber.getTagName();
        assert.equal(TransactionNumberTag, "input");
        await TransactionNumber.sendKeys("500");
      });

      it("has sent amount", async function () {
        const SentAmountNumber = await driver.findElement(By.id("SentAmount"));
        await SentAmountNumber.clear();
        const SentAmountNumberTag = await SentAmountNumber.getTagName();
        assert.equal(SentAmountNumberTag, "input");
        await SentAmountNumber.sendKeys("500");
        await driver.sleep(3000);
      });

      it("Should be able to upload a file successfully", async function () {
        const image = path.resolve("./test/resources/image.PNG");
        await driver.manage().setTimeouts({ implicit: 5000 });
        await driver.findElement(By.id("TransactionReceipt")).sendKeys(image);
      });

      it("has sent Remarks", async function () {
        const RemarksInput = await driver.findElement(By.id("Remarks"));
        await RemarksInput.clear();
        const RemarksInputTag = await RemarksInput.getTagName();
        assert.equal(RemarksInputTag, "textarea");
        await RemarksInput.sendKeys("This is remarks");
        await driver.sleep(3000);
      });

      it("has open account to deposit section", async function () {
        const nextButton = await driver.findElement(
          By.id("verifyPINRequestHandler")
        );

        await nextButton.click();

        const AmountInput = await driver.findElement(By.id("Amount"));
        await AmountInput.clear();
        const AmountInputTag = await AmountInput.getTagName();
        assert.equal(AmountInputTag, "input");
        await driver.sleep(3000);
      });
      it("will show validation error containing Your deposit amount and bank transfer amount dose not match.", async function () {
        const ErrorTextTag = await driver
          .findElement(By.id("errorAmount"))
          .getText();
        assert.equal(
          ErrorTextTag,
          "Your deposit amount and bank transfer amount dose not match."
        );
        await driver.sleep(2000);
      });

      it("has Amount input", async function () {
        const AmountInput = await driver.findElement(By.id("Amount"));
        const AmountInputTag = await AmountInput.getTagName();
        assert.equal(AmountInputTag, "input");
        await AmountInput.sendKeys("500");
      });

      it("has open preview section", async function () {
        const nextButton = await driver.findElement(
          By.id("verifyPINRequestHandler")
        );
        await nextButton.click();
        await driver.sleep(3000);
      });

      it("will open OTP dialogue correctly", async function () {
        const nextButton = await driver.findElement(
          By.id("verifyPINRequestHandler")
        );
        await nextButton.click();

        const cardPINInput = await driver.findElement(By.id("CardPIN"));
        await cardPINInput.sendKeys(process.env.REACT_APP_USER_CARD_PIN);
        await driver.sleep(3000);

        const Submit = await driver.findElement(
          By.id("verifyPINRequestHandler")
        );
        await Submit.click();
      });
      it("has OTP input fields", async function () {
        const otp = process.env.REACT_APP_USER_OTP;
        const otpDigits = otp.split("");

        for (let i = 0; i < otpDigits.length; i++) {
          const otpInputField = await driver.findElement(
            By.id(`otp-input-${i}`)
          );

          const otpInputFieldTag = await otpInputField.getTagName();
          assert.equal(otpInputFieldTag, "input");
          await otpInputField.sendKeys(otpDigits[i]);
        }

        const confirmButtonText = await driver.findElement(
          By.id("otpValidateRequestHandler")
        );
        await confirmButtonText.click();
        await driver.sleep(2000);
      });

      it("has OTP submit button and successfully opened transfer to bank success dialog", async function () {
        const successText = await driver.findElement(By.id("success"));
        assert.notEqual(successText, null);
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
