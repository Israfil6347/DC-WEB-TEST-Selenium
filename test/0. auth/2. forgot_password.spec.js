const { suite } = require("selenium-webdriver/testing");
const { Browser, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Forget Password", function () {
      let driver;
      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("has opened website and login dialog correctly", async function () {
        await driver.get(process.env.REACT_APP_BASE_URL);
        await driver.sleep(2000);

        const title = await driver.getTitle();
        assert.equal(title, "Dhaka Credit");

        const memberLoginButton = await driver.findElement(
          By.id("MemberLogin")
        );
        const memberLoginButtonText = await memberLoginButton.getText();
        assert.equal(memberLoginButtonText, "Member Login");
        await memberLoginButton.click();
        await driver.sleep(2000);
      });

      it("has forget password button and opened forget password dialog correctly", async function () {
        const forgetPassword = await driver.findElement(
          By.id("forgotPassword")
        );
        const forgetPasswordTag = await forgetPassword.getText();
        assert.equal(forgetPasswordTag, "Forgotten password?");
        await forgetPassword.click();
        await driver.sleep(2000);
      });

      it("has exit button ", async function () {
        const ExitButtonClicked = await driver.findElement(
          By.id("closeDialogue")
        );
        const ExitButtonTag = await ExitButtonClicked.getText();
        assert.equal(ExitButtonTag, "EXIT");
      });

      it("has mobile number input", async function () {
        const mobileNumber = await driver.findElement(By.id("MobileNumber"));
        await mobileNumber.clear();
        const mobileNumberTag = await mobileNumber.getTagName();
        assert.equal(mobileNumberTag, "input");
      });

      it("sill show empty mobile number error", async function () {
        const confirmButton = await driver.findElement(
          By.id("verifyMobileNumberRequestHandler")
        );
        const confirmButtonTag = await confirmButton.getTagName();
        assert.equal(confirmButtonTag, "button");
        await confirmButton.click();

        const ErrorTextTag = await driver
          .findElement(By.id("error_MobileNumber"))
          .getText();
        assert.equal(ErrorTextTag, "Enter Valid Mobile Number");
        await driver.sleep(2000);
      });

      it("will show validation error in mobile number is invalid", async function () {
        const mobileNumber = await driver.findElement(By.id("MobileNumber"));
        const mobileNumberTag = await mobileNumber.getTagName();
        assert.equal(mobileNumberTag, "input");
        await mobileNumber.sendKeys("12345678");

        const ErrorTextTag = await driver
          .findElement(By.id("error_MobileNumber"))
          .getText();
        assert.equal(
          ErrorTextTag,
          `Appropriate format required("Ex :+880-1000000000")`
        );
        await driver.sleep(2000);
      });

      it("has verify mobile number button and verified mobile number successfully", async function () {
        const mobileNumber = await driver.findElement(By.id("MobileNumber"));
        await mobileNumber.clear();
        await mobileNumber.sendKeys(await process.env.REACT_APP_USER_MOBILE);
        const confirmButton = await driver.findElement(
          By.id("verifyMobileNumberRequestHandler")
        );
        const confirmButtonTag = await confirmButton.getTagName();
        assert.equal(confirmButtonTag, "button");
        await confirmButton.click();
        await driver.sleep(2000);

        // Opened OTP Verify Dialogue
        const ResendOtpButton = await driver.findElement(
          By.id("resendOTPRequestHandler")
        );
        const ResendOtpButtonTag = await ResendOtpButton.getText();
        assert.equal(ResendOtpButtonTag, "RESEND OTP");
      });

      it("has opened OTP dialog successfully and has resent OTP button", async function () {
        const ResendOtpButton = await driver.findElement(
          By.id("resendOTPRequestHandler")
        );
        const ResendOtpButtonTag = await ResendOtpButton.getText();
        assert.equal(ResendOtpButtonTag, "RESEND OTP");
      });

      it("will show invalid OTP dialog", async function () {
        const otp = process.env.REACT_APP_USER_ERROR_OTP;
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
        const FailedDialogData = await driver.findElement(By.id("Failed"));
        const FailedDialogDataTag = await FailedDialogData.getText();
        assert.equal(FailedDialogDataTag, "Invalid OTP");

        const RetryButtonText = await driver.findElement(
          By.id("failed_OkButtonText")
        );
        await RetryButtonText.click();
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
      });

      it("has OTP submit button and successfully opened password reset dialog", async function () {
        const confirmButton = await driver.findElement(
          By.id("otpValidateRequestHandler")
        );
        const confirmButtonTag = await confirmButton.getTagName();

        assert.equal(confirmButtonTag, "button");
        await confirmButton.click();
        await driver.sleep(2000);

        const PasswordResetUserEmail = await driver.findElement(
          By.id("PasswordResetUserName")
        );
        const PasswordResetUserEmailTag =
          await PasswordResetUserEmail.getTagName();

        assert.equal(PasswordResetUserEmailTag, "input");
      });

      it("hast submit username and password  error check", async function () {
        const userPasswordChangeButtonCLick = await driver.findElement(
          By.id("userRegistrationSubmitHandler")
        );
        await userPasswordChangeButtonCLick.click();

        const userNameError = await driver
          .findElement(By.id("error_PasswordResetUserName"))
          .getText();
        assert.equal(userNameError, "Email is required");

        const userPassError = await driver
          .findElement(By.id("error_PasswordResetNewPass"))
          .getText();
        assert.equal(userPassError, "Please enter New Password.");
      });

      it("will show validation error containing email is not valid", async function () {
        const PasswordResetUserName = await driver.findElement(
          By.id("PasswordResetUserName")
        );
        await PasswordResetUserName.sendKeys(`asdf@`);
        const userNameError = await driver
          .findElement(By.id("error_PasswordResetUserName"))
          .getText();
        assert.equal(userNameError, "Email is not valid");
      });

      it("has email input", async function () {
        const PasswordResetUserEmail = await driver.findElement(
          By.id("PasswordResetUserName")
        );
        await PasswordResetUserEmail.clear();
        const PasswordResetUserEmailTag =
          await PasswordResetUserEmail.getTagName();

        assert.equal(PasswordResetUserEmailTag, "input");
        await PasswordResetUserEmail.sendKeys(
          await process.env.REACT_APP_USER_ID
        );
      });

      it("will show validation error containing Password should be at least 6 characters", async function () {
        const userPassInput = await driver.findElement(
          By.id("PasswordResetNewPass")
        );
        await userPassInput.sendKeys(`ab`);
        const userPassError = await driver
          .findElement(By.id("error_PasswordResetNewPass"))
          .getText();
        assert.equal(
          userPassError,
          "Password should be at least 6 characters."
        );
      });

      it("has Password input", async function () {
        const PasswordResetUserNewPass = await driver.findElement(
          By.id("PasswordResetNewPass")
        );
        await PasswordResetUserNewPass.clear();
        const PasswordResetUserNewPassTag =
          await PasswordResetUserNewPass.getTagName();

        assert.equal(PasswordResetUserNewPassTag, "input");
        await PasswordResetUserNewPass.sendKeys(
          await process.env.REACT_APP_USER_CHANGE_PASSWORD
        );
      });

      it("will show validation error containing Password do not match", async function () {
        const userConfirmPassInput = await driver.findElement(
          By.id("PasswordResetConPass")
        );
        await userConfirmPassInput.sendKeys(``);
        const userPassError = await driver
          .findElement(By.id("error_PasswordResetConPass"))
          .getText();
        assert.equal(userPassError, "Password do not match");
      });

      it("has confirm Password input", async function () {
        const PasswordResetUserConPass = await driver.findElement(
          By.id("PasswordResetConPass")
        );
        const PasswordResetUserConPassTag =
          await PasswordResetUserConPass.getTagName();

        assert.equal(PasswordResetUserConPassTag, "input");
        await PasswordResetUserConPass.sendKeys(
          await process.env.REACT_APP_USER_CHANGE_PASSWORD
        );
      });

      it("has submit button and reset password successfully", async function () {
        const submitButton = await driver.findElement(
          By.id("userRegistrationSubmitHandler")
        );
        const submitButtonTag = await submitButton.getTagName();
        assert.equal(submitButtonTag, "button");
        await submitButton.click();
        await driver.sleep(2000);
        const updateData = await driver
          .findElement(By.id("successFullyUpdate"))
          .getText();
        assert.equal(updateData, "Password has been changed successfully");
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
