const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Transfer To bKash", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened transfer to bKash page correctly", async function () {
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

        const openAccountMenu = await driver.findElement(
          By.id("bKash_Transfer_Request")
        );
        await openAccountMenu.click();

        await driver.sleep(2000);
        const openAccountUrl =
          (await process.env.REACT_APP_BASE_URL) +
          "transfer/bKash_Transfer_Request";
        let currentUrl2 = await driver.getCurrentUrl();

        assert.equal(currentUrl2, openAccountUrl);
      });
      it("has back button", async function () {
        const signupButton = await driver
          .findElement(By.id("handleBack"))
          .getText();
        assert.equal(signupButton, "BACK");
      });

      it("has next button", async function () {
        const nextButton = await driver
          .findElement(By.id("verifyCardPinHandler"))
          .getText();
        assert.equal(nextButton, "NEXT");
      });

      it("has open transfer amount section", async function () {
        const nextButton = await driver.findElement(
          By.id("verifyCardPinHandler")
        );
        await nextButton.click();

        const AmountInput = await driver.findElement(By.id("Amount"));
        const AmountInputTag = await AmountInput.getTagName();
        assert.equal(AmountInputTag, "input");
      });
      it("will show validation error", async function () {
        const nextButton = await driver.findElement(
          By.id("verifyCardPinHandler")
        );
        await nextButton.click();

        const ErrorText = await driver
          .findElement(By.id("error_Amount"))
          .getText();
        assert.equal(ErrorText, "Please enter amount");
      });

      it("has open preview section", async function () {
        const AmountInput = await driver.findElement(By.id("Amount"));
        await AmountInput.clear();
        await AmountInput.sendKeys("500");

        const nextButton = await driver.findElement(
          By.id("verifyCardPinHandler")
        );
        await nextButton.click();
        await driver.sleep(2000);
      });
      it("has open card pin verify section", async function () {
        const nextButton = await driver.findElement(
          By.id("verifyCardPinHandler")
        );
        await nextButton.click();
        await driver.sleep(2000);
      });
      it("will open OTP dialogue correctly", async function () {
        const cardPINInput = await driver.findElement(By.id("CardPIN"));
        await cardPINInput.clear();
        await cardPINInput.sendKeys(process.env.REACT_APP_USER_CARD_PIN);

        const signupButton = await driver.findElement(By.id("verifyCardPin"));
        await signupButton.click();
        await driver.sleep(2000);

        const OtpConfirmButton = await driver.findElement(
          By.id("otpValidateRequestHandler")
        );
        const OtpConfirmButtonTag = await OtpConfirmButton.getTagName();
        assert.equal(OtpConfirmButtonTag, "button");
      });
      // it("has OTP input fields", async function () {
      //   const otp = process.env.REACT_APP_USER_OTP;
      //   const otpDigits = otp.split("");

      //   for (let i = 0; i < otpDigits.length; i++) {
      //     const otpInputField = await driver.findElement(
      //       By.id(`otp-input-${i}`)
      //     );

      //     const otpInputFieldTag = await otpInputField.getTagName();
      //     assert.equal(otpInputFieldTag, "input");
      //     await otpInputField.sendKeys(otpDigits[i]);
      //   }

      //   const confirmButtonText = await driver.findElement(
      //     By.id("otpValidateRequestHandler")
      //   );
      //   await confirmButtonText.click();
      //   await driver.sleep(2000);
      // });
      // it("has OTP submit button and successfully opened payment success dialog", async function () {
      //   const successText = await driver.findElement(By.id("success"));
      //   assert.notEqual(successText, null);
      // });
    });
  },
  { browsers: [Browser.CHROME] }
);
