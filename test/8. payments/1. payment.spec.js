const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Payment", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened dc payment page correctly", async function () {
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
        const menu = await driver.findElement(By.id("payment"));
        await menu.click();

        await driver.sleep(2000);
        const menuUrl =
          (await process.env.REACT_APP_BASE_URL) + "payment/dc_payment";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, menuUrl);
        await driver.sleep(2000);
      });

      it("has account selection dropdown and saving account selected", async function () {
        const selectOptionInput = driver.findElement(
          By.css("select[name=AccountTypeName]")
        );
        const select = new Select(selectOptionInput);
        const SavingAccount = await driver.findElement(
          By.css(`option[value='${process.env.REACT_APP_USER_SAVING_ACCOUNT}']`)
        );
        await select.selectByValue(process.env.REACT_APP_USER_SAVING_ACCOUNT);
        assert.equal(true, await SavingAccount.isSelected());
      });

      it("has balance input", async function () {
        const BalanceInput = await driver.findElement(By.id("Balance"));
        const BalanceInputTag = await BalanceInput.getTagName();
        assert.equal(BalanceInputTag, "input");
      });

      it("has withdrawable balance input", async function () {
        const WithdrawableBalanceInput = await driver.findElement(
          By.id("WithdrawableBalance")
        );
        const WithdrawBalanceInputTag =
          await WithdrawableBalanceInput.getTagName();
        assert.equal(WithdrawBalanceInputTag, "input");
      });

      it("has card selection dropdown and user card is selected", async function () {
        const selectOptionInput = driver.findElement(
          By.css("select[name=CardNo]")
        );
        const select = new Select(selectOptionInput);
        const CardNo = await driver.findElement(
          By.css(`option[value='${process.env.REACT_APP_USER_CARD_NUMBER}']`)
        );
        await select.selectByValue(process.env.REACT_APP_USER_CARD_NUMBER);
        assert.equal(true, await CardNo.isSelected());
      });

      it("has back button", async function () {
        const signupButton = await driver
          .findElement(By.id("handleBack"))
          .getText();
        assert.equal(signupButton, "BACK");
      });

      it("has next button", async function () {
        const nextButton = await driver
          .findElement(By.id("verifyCardPin"))
          .getText();
        assert.equal(nextButton, "NEXT");
      });

      it("will payment to section", async function () {
        const nextButton = await driver.findElement(By.id("verifyCardPin"));
        const nextButtonTag = await nextButton.getTagName();
        assert.equal(nextButtonTag, "button");
        await nextButton.click();
        await driver.sleep(2000);
      });

      it("will show validation error containing Please enter service name", async function () {
        const nextButton = await driver.findElement(By.id("verifyCardPin"));
        const nextButtonTag = await nextButton.getTagName();
        assert.equal(nextButtonTag, "button");
        await nextButton.click();
        await driver.sleep(2000);

        const ErrorServiceNameTag = await driver
          .findElement(By.id("error_ServiceName"))
          .getText();
        assert.equal(ErrorServiceNameTag, "Please enter service name");
        await driver.sleep(2000);
      });

      it("will show validation error containing Please enter Notify Person", async function () {
        const ErrorTextTag = await driver
          .findElement(By.id("error_NotifyPersonId"))
          .getText();
        assert.equal(ErrorTextTag, "Please enter Notify Person");
        await driver.sleep(2000);
      });

      it("will show validation error containing Please enter valid amount", async function () {
        const ErrorTextTag = await driver
          .findElement(By.id("error_Amount"))
          .getText();
        assert.equal(ErrorTextTag, "Please enter valid amount");
        await driver.sleep(2000);
      });

      it("has serviceName selection dropdown and selected Dhaka Credit School", async function () {
        const serviceNameInput = driver.findElement(
          By.css("select[name=ServiceName]")
        );
        const select = new Select(serviceNameInput);
        const valueSchool = await driver.findElement(
          By.css("option[value='T-0058497']")
        );
        await select.selectByValue("T-0058497");
        assert.equal(true, await valueSchool.isSelected());
        await driver.sleep(3000);
      });

      it("has NotifyPerson selection dropdown and one person", async function () {
        const selectNotifyPersonInput = driver.findElement(
          By.css("select[name=selectNotifyPerson]")
        );
        const select = new Select(selectNotifyPersonInput);
        const NotifyPerson = await driver.findElement(
          By.css(`option[value='${process.env.REACT_APP_NOTIFY_PERSON}']`)
        );
        await select.selectByValue(process.env.REACT_APP_NOTIFY_PERSON);
        assert.equal(true, await NotifyPerson.isSelected());
        await driver.sleep(2000);
      });

      it("has amount input", async function () {
        const AmountInput = await driver.findElement(By.id("Amount"));
        const AmountInputTag = await AmountInput.getTagName();
        assert.equal(AmountInputTag, "input");
      });

      it("has reference input", async function () {
        const ReferenceInput = await driver.findElement(By.id("Reference"));
        const ReferenceInputTag = await ReferenceInput.getTagName();
        assert.equal(ReferenceInputTag, "input");
      });

      it("has card PIN verify section", async function () {
        const AmountInput = await driver.findElement(By.id("Amount"));
        await AmountInput.clear();
        const AmountInputTag = await AmountInput.getTagName();
        assert.equal(AmountInputTag, "input");
        await AmountInput.sendKeys("500");

        const ReferenceInput = await driver.findElement(By.id("Reference"));
        const ReferenceInputTag = await ReferenceInput.getTagName();

        assert.equal(ReferenceInputTag, "input");
        await ReferenceInput.sendKeys("1234");
        await driver.sleep(2000);

        const nextButton = await driver.findElement(By.id("verifyCardPin"));
        const nextButtonTag = await nextButton.getTagName();
        assert.equal(nextButtonTag, "button");
        await nextButton.click();
        await driver.sleep(2000);
      });

      it("has card selection dropdown and user card is selected", async function () {
        const selectOptionInput = driver.findElement(
          By.css("select[name=CardNo]")
        );
        const select = new Select(selectOptionInput);

        const CardNo = await driver.findElement(
          By.css(`option[value= '${process.env.REACT_APP_USER_CARD_NUMBER}']`)
        );

        await select.selectByValue(process.env.REACT_APP_USER_CARD_NUMBER);
        assert.equal(true, await CardNo.isSelected());
      });

      it("has cardPin input", async function () {
        const CardPINInput = await driver.findElement(By.id("CardPIN"));
        const CardPINInputTag = await CardPINInput.getTagName();
        assert.equal(CardPINInputTag, "input");
      });

      it("has validation error in Please enter PIN", async function () {
        const nextButton = await driver.findElement(By.id("verifyCardPin"));
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

      it("will show error dialog ", async function () {
        const cardPINInput = await driver.findElement(By.id("CardPIN"));
        await cardPINInput.clear();
        await cardPINInput.sendKeys(`1254`);
        const signupButton = await driver.findElement(By.id("verifyCardPin"));
        await signupButton.click();

        const failedText = await driver.findElement(By.id("Failed")).getText();
        assert.equal(failedText, "Invalid Card PIN Remaining Tries 2");

        const nextButton = await driver.findElement(
          By.id("failed_cancelButtonText")
        );
        await nextButton.click();
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

      it("has OTP submit button and successfully opened payment success dialog", async function () {
        const successText = await driver.findElement(By.id("success"));
        assert.notEqual(successText, null);
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
