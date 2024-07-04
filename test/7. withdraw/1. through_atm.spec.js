const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Through ATM", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened through ATM page correctly", async function () {
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
        const menu = await driver.findElement(By.id("Withdraw"));
        await menu.click();

        await driver.sleep(2000);
        const menuUrl =
          (await process.env.REACT_APP_BASE_URL) + "Withdraw/through_atm";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, menuUrl);
        await driver.sleep(2000);
      });

      it("has balance input", async function () {
        const BalanceInput = await driver.findElement(By.id("Balance"));
        const BalanceInputInputTag = await BalanceInput.getTagName();
        assert.equal(BalanceInputInputTag, "input");
      });

      it("has withdraw able balance input", async function () {
        const WithdrawableBalanceInput = await driver.findElement(
          By.id("WithdrawableBalance")
        );
        const WithdrawableBalanceInputTag =
          await WithdrawableBalanceInput.getTagName();
        assert.equal(WithdrawableBalanceInputTag, "input");
      });

      it("has back button", async function () {
        const signupButton = await driver
          .findElement(By.id("handleBack"))
          .getText();
        assert.equal(signupButton, "BACK");
      });

      it("has next button", async function () {
        const nextButton = await driver
          .findElement(By.id("verifyCardPINRequest"))
          .getText();
        assert.equal(nextButton, "NEXT");
      });

      it("has amount input", async function () {
        const signupButton = await driver.findElement(
          By.id("verifyCardPINRequest")
        );
        await signupButton.click();

        const AmountInput = await driver.findElement(By.id("Amount"));
        const AmountTag = await AmountInput.getTagName();
        assert.equal(AmountTag, "input");
      });

      it("has validation error in Enter an amount", async function () {
        const nextButton = await driver.findElement(
          By.id("verifyCardPINRequest")
        );
        await nextButton.click();
        const AmountError = await driver
          .findElement(By.id("error_Amount"))
          .getText();
        assert.equal(AmountError, "Enter an amount");
      });

      it("has validation error in Amount must be multiplied by 500/-", async function () {
        const AmountInput = await driver.findElement(By.id("Amount"));
        await AmountInput.sendKeys(`402`);
        const AmountError = await driver
          .findElement(By.id("error_Amount"))
          .getText();
        assert.equal(AmountError, "Amount must be multiplied by 500/-");
      });

      it("has opened Card PIN Verify section correctly and has cardPin input", async function () {
        const AmountInput = await driver.findElement(By.id("Amount"));
        await AmountInput.clear();
        await AmountInput.sendKeys(`500`);
        const signupButton = await driver.findElement(
          By.id("verifyCardPINRequest")
        );
        await signupButton.click();

        const WithdrawableBalanceInput = await driver.findElement(
          By.id("CardPIN")
        );
        const WithdrawableBalanceInputTag =
          await WithdrawableBalanceInput.getTagName();
        assert.equal(WithdrawableBalanceInputTag, "input");
      });

      it("has validation error in Please enter PIN", async function () {
        const nextButton = await driver.findElement(
          By.id("verifyCardPINRequest")
        );
        await nextButton.click();
        const cardPinError = await driver
          .findElement(By.id("error_CardPIN"))
          .getText();
        assert.equal(cardPinError, "Please enter PIN");
      });

      it("has validation error in PIN must be four digit", async function () {
        const cardPINInput = await driver.findElement(By.id("CardPIN"));
        await cardPINInput.sendKeys(`12345`);
        const cardPinError = await driver
          .findElement(By.id("error_CardPIN"))
          .getText();
        assert.equal(cardPinError, "PIN must be four digit");
      });

      it("has opened OTP dialog successfully and has resent OTP button", async function () {
        const cardPINInput = await driver.findElement(By.id("CardPIN"));
        await cardPINInput.clear();
        await cardPINInput.sendKeys(process.env.REACT_APP_USER_CARD_PIN);
        const signupButton = await driver.findElement(
          By.id("verifyCardPINRequest")
        );
        await signupButton.click();

        const ResendOtpButton = await driver.findElement(
          By.id("resendOTPRequestHandler")
        );
        const ResendOtpButtonTag = await ResendOtpButton.getText();
        assert.equal(ResendOtpButtonTag, "RESEND OTP");
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

      it("has OTP submit button and successfully opened QR Code dialog", async function () {
        const QRCode = await driver.findElement(By.id("QRCodeValue"));
        assert.notEqual(QRCode, null);
        const QRCodeOkButton = await driver.findElement(By.id("QRCodeButton"));
        const QRCodeButtonTag = await QRCodeOkButton.getTagName();
        assert.equal(QRCodeButtonTag, "button");
        await QRCodeOkButton.click();
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
