const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Deposit later", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened deposit later page correctly", async function () {
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
        const menu = await driver.findElement(By.id("deposits"));
        await menu.click();

        await driver.sleep(2000);
        const menuUrl =
          (await process.env.REACT_APP_BASE_URL) + "deposits/deposit_now";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, menuUrl);

        const openAccountMenu = await driver.findElement(
          By.id("deposit_later")
        );
        await openAccountMenu.click();

        await driver.sleep(2000);
        const openAccountUrl =
          (await process.env.REACT_APP_BASE_URL) + "deposits/deposit_later";
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
          .findElement(By.id("nextButton"))
          .getText();
        assert.equal(nextButton, "NEXT");
      });

      it("will open  deposit for section", async function () {
        const nextButton = await driver.findElement(By.id("nextButton"));
        await nextButton.click();
        await driver.sleep(3000);
      });

      it("has search account number", async function () {
        const AccountNumberInput = await driver.findElement(
          By.id("AccountNumber")
        );
        await AccountNumberInput.clear();
        await AccountNumberInput.sendKeys(
          process.env.REACT_APP_USER_SAVING_ACCOUNT
        );

        const AccountNumberButton = await driver.findElement(
          By.id("submitButton")
        );
        await AccountNumberButton.click();
      });

      it("will open Account to deposit section", async function () {
        const nextButton = await driver.findElement(By.id("nextButton"));
        await nextButton.click();
        await driver.sleep(3000);
      });

      it("has amount input", async function () {
        const AccountNumberInput = await driver.findElement(By.id("Amount"));
        const AccountNumberInputTag = await AccountNumberInput.getTagName();
        assert.equal(AccountNumberInputTag, "input");
      });

      it("will open upcoming month schedule section", async function () {
        const nextButton = await driver.findElement(By.id("nextButton"));
        await nextButton.click();
        await driver.sleep(3000);
      });

      it("has DepositLaterDate selection dropdown and  date is selected", async function () {
        const selectOptionInput = driver.findElement(
          By.css("select[name=DepositLaterDate]")
        );
        const select = new Select(selectOptionInput);
        const date = await driver.findElement(By.id("DepositLaterDateId_4"));
        await select.selectByValue("5");
        assert.equal(true, await date.isSelected());
      });

      it("has DepositLaterMonth dropdown and  Month is selected", async function () {
        const selectOptionInput = driver.findElement(
          By.css("select[name=RepeatMonths]")
        );
        const select = new Select(selectOptionInput);
        const Months = await driver.findElement(By.id("RepeatMonthsId_10"));
        await select.selectByValue("11");
        assert.equal(true, await Months.isSelected());
        await driver.sleep(3000);
      });
      
      it("will open preview section", async function () {
        const nextButton = await driver.findElement(By.id("nextButton"));
        await nextButton.click();
        await driver.sleep(3000);
      });
      it("will open card pin section", async function () {
        const nextButton = await driver.findElement(By.id("nextButton"));
        await nextButton.click();
        await driver.sleep(3000);
      });
      it("will open OTP dialogue correctly", async function () {
        const cardPINInput = await driver.findElement(By.id("CardPIN"));
        await cardPINInput.clear();
        await cardPINInput.sendKeys(process.env.REACT_APP_USER_CARD_PIN);

        const nextButton = await driver.findElement(By.id("nextButton"));
        await nextButton.click();
        await driver.sleep(2000);
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
      it("has OTP submit button and successfully opened  success dialog", async function () {
        const successText = await driver.findElement(By.id("success"));
        assert.notEqual(successText, null);
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
