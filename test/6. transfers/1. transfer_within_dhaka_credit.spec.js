const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Transfer within Dhaka Credit", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened transfer within dhaka credit page correctly", async function () {
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
        await driver.sleep(2000);
      });

      it("has back button", async function () {
        const signupButton = await driver
          .findElement(By.id("handleBack"))
          .getText();
        assert.equal(signupButton, "BACK");
      });

      it("has next button", async function () {
        const nextButton = await driver
          .findElement(By.id("fundTransferSubmitRequest"))
          .getText();
        assert.equal(nextButton, "NEXT");
      });

      it("has transfer to section", async function () {
        const nextButton = await driver.findElement(
          By.id("fundTransferSubmitRequest")
        );
        const nextButtonTag = await nextButton.getTagName();
        assert.equal(nextButtonTag, "button");
        await nextButton.click();
        await driver.sleep(2000);
      });

      it("has  account number input", async function () {
        const AccountNumberInput = await driver.findElement(
          By.id("accountnumber")
        );
        const AccountNumberInputTag = await AccountNumberInput.getTagName();
        assert.equal(AccountNumberInputTag, "input");
      });

      it("has  account search button", async function () {
        const AccountNumberButton = await driver.findElement(
          By.id("submitButton")
        );
        const AccountNumberButtonTag = await AccountNumberButton.getTagName();
        assert.equal(AccountNumberButtonTag, "button");
      });

      it("has recipient name input", async function () {
        const RecipientNameInput = await driver.findElement(
          By.id("RecipientName")
        );
        const RecipientNameInputTag = await RecipientNameInput.getTagName();
        assert.equal(RecipientNameInputTag, "input");
      });

      it("has transfer amount input", async function () {
        const AmountInput = await driver.findElement(By.id("Amount"));
        const AmountInputTag = await AmountInput.getTagName();
        assert.equal(AmountInputTag, "input");
      });

      it("will open invalid account number dialogue", async function () {
        const AccountNumberButton = await driver.findElement(
          By.id("submitButton")
        );

        await AccountNumberButton.click();

        const AccountNumberEmptyText = await driver.findElement(
          By.id("Failed")
        );
        const errorResponseText = await AccountNumberEmptyText.getText();
        assert.equal(
          errorResponseText,
          "Please write withdrawable (STD/Savings) account number."
        );
        await driver.sleep(3000);

        const okButton = await driver.findElement(
          By.id("failed_cancelButtonText")
        );

        await okButton.click();
      });

      // TODO: Own account check

      it("has account name with transaction account name", async function () {
        const searchInput = await driver.findElement(By.id("accountnumber"));
        await searchInput.sendKeys(process.env.REACT_APP_TRANSACTION_ACCOUNT);

        const AccountNumberButton = await driver.findElement(
          By.id("submitButton")
        );
        const AccountNumberButtonTag = await AccountNumberButton.getTagName();
        assert.equal(AccountNumberButtonTag, "button");
        await AccountNumberButton.click();
        await driver.sleep(3000);

        // TODO: has transaction account name
      });

      it("has Amount input", async function () {
        const AmountInput = await driver.findElement(By.id("Amount"));
        await AmountInput.clear();
        const AmountInputTag = await AmountInput.getTagName();
        assert.equal(AmountInputTag, "input");
      });

      // TODO: validation check

      it("has opened confirm transfer dialogue correctly", async function () {
        const AmountInput = await driver.findElement(By.id("Amount"));
        await AmountInput.clear();
        const AmountInputTag = await AmountInput.getTagName();
        assert.equal(AmountInputTag, "input");
        await AmountInput.sendKeys("500");
        await driver.sleep(3000);

        const nextButton = await driver.findElement(
          By.id("fundTransferSubmitRequest")
        );
        const nextButtonTag = await nextButton.getTagName();
        assert.equal(nextButtonTag, "button");
        await nextButton.click();
        await driver.sleep(2000);

        const cardPINInput = await driver.findElement(By.id("CardPIN"));
        await cardPINInput.clear();
        await cardPINInput.sendKeys(process.env.REACT_APP_USER_CARD_PIN);
      });

      it("has transfer confirm no button", async function () {
        const nextButton = await driver.findElement(
          By.id("fundTransferSubmitRequest")
        );
        const nextButtonTag = await nextButton.getTagName();
        assert.equal(nextButtonTag, "button");
        await nextButton.click();
        await driver.sleep(2000);

        const NoButton = await driver
          .findElement(By.id("ConfirmTransferResponseStatus"))
          .getText();
        assert.equal(NoButton, "NO");
      });
      it("has transfer confirm yes button", async function () {
        const YesButton = await driver.findElement(
          By.id("verifyTransferPinRequest")
        );
        const YesButtonTag = await YesButton.getTagName();
        assert.equal(YesButtonTag, "button");
        await YesButton.click();
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

      it("has OTP submit button and successfully opened success dialog", async function () {
        const successText = await driver.findElement(By.id("success"));
        assert.notEqual(successText, null);
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
