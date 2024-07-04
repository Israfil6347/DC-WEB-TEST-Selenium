const { suite } = require("selenium-webdriver/testing");
const { Browser, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Login", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened website and opened login modal correctly", async function () {
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

      it("has user name input", async function () {
        const userNameInput = await driver.findElement(By.id("username"));
        const userNameTag = await userNameInput.getTagName();
        assert.equal(userNameTag, "input");
      });

      it("has password input", async function () {
        const passwordInput = await driver.findElement(By.id("userPass"));
        const passwordTag = await passwordInput.getTagName();
        assert.equal(passwordTag, "input");
      });

      it("has sign up button", async function () {
        const signupButton = await driver
          .findElement(By.id("TermsConditionsHandler"))
          .getText();
        assert.equal(signupButton, "SIGN UP");
      });

      it("has login button", async function () {
        const loginButton = await driver.findElement(By.id("submit")).getText();
        assert.equal(loginButton, "LOG IN");
      });

      it("has email and password required error", async function () {
        const loginButton = await driver.findElement(By.id("submit"));
        await loginButton.click();
        const userNameError = await driver
          .findElement(By.id("error_username"))
          .getText();
        assert.equal(userNameError, "User name or email is required");
        const userPassError = await driver
          .findElement(By.id("error_userPass"))
          .getText();
        assert.equal(userPassError, "Password is required.");
      });

      it("has invalid email error", async function () {
        const userNameInput = await driver.findElement(By.id("username"));
        await userNameInput.sendKeys(`asdf@`);
        const userNameError = await driver
          .findElement(By.id("error_username"))
          .getText();
        assert.equal(userNameError, "Appropriate format required");
      });

      it("has invalid password error", async function () {
        const userPassInput = await driver.findElement(By.id("userPass"));
        await userPassInput.sendKeys(`a`);
        const userPassError = await driver
          .findElement(By.id("error_userPass"))
          .getText();
        assert.equal(
          userPassError,
          "Password should be at least 3 characters."
        );
      });

      it("can login successfully", async function () {
        const userNameInput = await driver.findElement(By.id("username"));
        await userNameInput.clear();
        await userNameInput.sendKeys(await process.env.REACT_APP_USER_ID);

        const userPassInput = await driver.findElement(By.id("userPass"));
        await userPassInput.clear();
        await userPassInput.sendKeys(await process.env.REACT_APP_USER_PASSWORD);

        const loginButton = await driver.findElement(By.id("submit"));
        await loginButton.click();

        await driver.sleep(2000);
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(
          currentUrl,
          process.env.REACT_APP_BASE_URL + "info/my_info"
        );
          
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
