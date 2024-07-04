const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Change Password", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened change password page correctly", async function () {
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
        const menu = await driver.findElement(By.id("privacy"));
        await menu.click();

        await driver.sleep(2000);
        const menuUrl =
          (await process.env.REACT_APP_BASE_URL) + "privacy/change_Password";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, menuUrl);
        await driver.sleep(2000);
      });

       it("has password input", async function () {
        const PasswordInput = await driver.findElement(By.id("password"));
        const passwordTag = await PasswordInput.getTagName();
        assert.equal(passwordTag, "input");
      });
      it("has new password input", async function () {
        const newPasswordInput = await driver.findElement(By.id("newpassword"));
        const newPasswordTag = await newPasswordInput.getTagName();
        assert.equal(newPasswordTag, "input");
      });
      it("has confirm password input", async function () {
        const confirmPasswordInput = await driver.findElement(By.id("confirmpassword"));
        const confirmPasswordTag = await confirmPasswordInput.getTagName();
        assert.equal(confirmPasswordTag, "input");
      });

      it("has submit button", async function () {
        const signupButton = await driver
          .findElement(By.id("changePassword"))
          .getText();
        assert.equal(signupButton, "SUBMIT");
      });

      it("has password and new password required error", async function () {
        const signupButton = await driver
          .findElement(By.id("changePassword"))
        await signupButton.click();

        const newPassWordError = await driver
          .findElement(By.id("error_password"))
          .getText();
        assert.equal(newPassWordError, "Please enter old password.");

        const newPasswordError = await driver
          .findElement(By.id("error_newpassword"))
          .getText();
        assert.equal(newPasswordError, "Please enter new password.");
      });

      it("has new password required error", async function () {
        const newPasswordInput = await driver.findElement(By.id("newpassword"));
          await newPasswordInput.sendKeys(`a`);

        const newPasswordError = await driver
            .findElement(By.id("error_newpassword"))
            .getText();
          assert.equal(newPasswordError, "Password should contain minimum 4 characters, with one UPPERCASE, lowercase, number and special character: @$! % * ? &")
      });
      it("will show error Dialog when old password do not match",async function(){
        const PasswordInput = await driver.findElement(By.id("password"));
        await PasswordInput.clear();
        const passwordInputTag =
        await PasswordInput.getTagName();
        assert.equal(passwordInputTag, "input");
        await PasswordInput.sendKeys(
        await process.env.REACT_APP_USER_CHANGE_PASSWORD
        );


        const newPasswordInput = await driver.findElement(By.id("newpassword"));
        await newPasswordInput.clear();
        const newPasswordInputTag =
        await newPasswordInput.getTagName();
        assert.equal(newPasswordInputTag, "input");
        await newPasswordInput.sendKeys(
        await process.env.REACT_APP_USER_CHANGE_PASSWORD
        );

        const confirmPasswordInput = await driver.findElement(By.id("confirmpassword"));
        await confirmPasswordInput.clear();
        const confirmPasswordInputTag =
        await confirmPasswordInput.getTagName();
        assert.equal(confirmPasswordInputTag, "input");
        await confirmPasswordInput.sendKeys(
        await process.env.REACT_APP_USER_CHANGE_PASSWORD
        );

        const signupButton = await driver.findElement(By.id("changePassword"));        
        await signupButton.click();

        await driver.sleep(3000);

        const OkButton = await driver.findElement(By.id("failed_cancelButtonText")).getText(); 
        assert.equal(OkButton, "OK");       
      })


      it("has ok button",async function(){
        const OkButton = await driver.findElement(By.id("failed_cancelButtonText"));
        await OkButton.click();
      })

      it("will successfully change password", async function(){

        const PasswordInput = await driver.findElement(By.id("password"));
        await PasswordInput.clear();
        const passwordInputTag =
        await PasswordInput.getTagName();
        assert.equal(passwordInputTag, "input");
        await PasswordInput.sendKeys(
        await process.env.REACT_APP_USER_PASSWORD
        );


        const newPasswordInput = await driver.findElement(By.id("newpassword"));
        await newPasswordInput.clear();
        const newPasswordInputTag =
        await newPasswordInput.getTagName();
        assert.equal(newPasswordInputTag, "input");
        await newPasswordInput.sendKeys(
        await process.env.REACT_APP_USER_CHANGE_PASSWORD
        );

        const confirmPasswordInput = await driver.findElement(By.id("confirmpassword"));
        await confirmPasswordInput.clear();
        const confirmPasswordInputTag =
        await confirmPasswordInput.getTagName();
        assert.equal(confirmPasswordInputTag, "input");
        await confirmPasswordInput.sendKeys(
        await process.env.REACT_APP_USER_CHANGE_PASSWORD
        );
       

        const signupButton = await driver.findElement(By.id("changePassword")); 
        const buttonTag= await signupButton.getTagName();    
        assert.equal(buttonTag, "button");
        await signupButton.click();

        await driver.sleep(3000);
    
      })
      it("Will success Dialog text check ",async function (){
        const updateData = await driver.findElement(By.id("success")).getText();
        assert.equal(
          updateData,
          "Password has been changed"
        );
      })

    });
  },
  { browsers: [Browser.CHROME] }
);
