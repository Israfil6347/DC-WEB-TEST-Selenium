const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Beneficiaries", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened beneficiaries page correctly", async function () {
        await driver.get(process.env.REACT_APP_BASE_URL);
        await driver.sleep(2000);

        const memberLoginButton = await driver.findElement(
          By.id("MemberLogin")
        );

        await memberLoginButton.click();
        await driver.sleep(1000);

        const userNameInput = await driver.findElement(By.id("username"));
        await userNameInput.sendKeys(await process.env.REACT_APP_USER_ID);

        const passwordInput = await driver.findElement(By.id("userPass"));
        await passwordInput.sendKeys(await process.env.REACT_APP_USER_PASSWORD);

        const loginButton = await driver.findElement(By.id("submit"));
        await loginButton.click();

        await driver.sleep(2000);
        const menu = await driver.findElement(By.id("beneficiary_Management"));
        await menu.click();

        await driver.sleep(2000);
        const menuUrl =
          (await process.env.REACT_APP_BASE_URL) +
          "info/beneficiary_Management";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, menuUrl);
        await driver.sleep(2000);
      });

      it("has  account number input", async function () {
        const AccountNumberInput = await driver.findElement(
          By.id("AccountNumber")
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

      it("has  add beneficiary button ", async function () {
        const AddBeneficiaryAdd = await driver.findElement(
          By.id("addBeneficiary")
        );
        const RecipientNameInputTag = await AddBeneficiaryAdd.getTagName();
        assert.equal(RecipientNameInputTag, "button");
      });

      it("has remove beneficiary account button ", async function () {
        const RemoveAddBeneficiaryAdd = await driver.findElement(
          By.id("RemoveBeneficiaryAccount")
        );
        const RemoveBeneficiaryTag = await RemoveAddBeneficiaryAdd.getTagName();
        assert.equal(RemoveBeneficiaryTag, "button");
      });

      it("has correct recipient name", async function () {
        const searchInput = await driver.findElement(By.id("AccountNumber"));
        await searchInput.sendKeys(
          await process.env.REACT_APP_TRANSACTION_ACCOUNT
        );
        const searchButton = await driver.findElement(By.id("submitButton"));
        await searchButton.click();
        await driver.sleep(2000);

        const accountHolder = await driver.findElement(By.id("RecipientName"));
        const accountHolderText = await accountHolder.getAttribute("value");
        assert.equal(
          accountHolderText,
          process.env.REACT_APP_TRANSACTION_ACCOUNT_NAME
        );
      });

      it("has invalid account number or account type", async function () {
        const searchButton = await driver.findElement(By.id("submitButton"));
        const searchInput = await driver.findElement(By.id("AccountNumber"));
        await searchInput.clear();
        await searchInput.sendKeys("123");
        await searchButton.click();
        await driver.sleep(2000);

        const errorResponse = await driver.findElement(By.id("Failed"));
        const errorResponseText = await errorResponse.getText();
        assert.equal(
          errorResponseText,
          "Invalid Account Number or Account Type."
        );
        const okButton = await driver.findElement(
          By.id("failed_cancelButtonText")
        );
        await okButton.click();
      });

      it("can add beneficiary", async function () {
        const searchButton = await driver.findElement(By.id("submitButton"));
        const searchInput = await driver.findElement(By.id("AccountNumber"));
        await searchInput.clear();
        await searchInput.sendKeys(process.env.REACT_APP_TRANSACTION_ACCOUNT);
        await searchButton.click();
        await driver.sleep(2000);

        const addBeneficiaryButton = await driver.findElement(
          By.id("addBeneficiary")
        );
        await addBeneficiaryButton.click();
        await driver.sleep(2000);

        const successResponse = await driver
          .findElement(By.id("success"))
          .getText();
        assert.equal(successResponse, "Saved Successfully");
        // TODO : success button does not have id
        const okButton = await driver.findElement(
          By.className(
            "w-1/2 rounded border bg-primary py-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant md:w-2/6"
          )
        );
        await okButton.click();
        await driver.sleep(2000);
      });

      it("can not add existing beneficiary", async function () {
        const searchButton = await driver.findElement(By.id("submitButton"));
        const searchInput = await driver.findElement(By.id("AccountNumber"));
        await searchInput.clear();
        await searchInput.sendKeys(process.env.REACT_APP_TRANSACTION_ACCOUNT);
        await searchButton.click();
        await driver.sleep(2000);

        const addBeneficiaryButton = await driver.findElement(
          By.id("addBeneficiary")
        );
        await addBeneficiaryButton.click();
        await driver.sleep(2000);

        const errorResponse = await driver
          .findElement(By.id("Failed"))
          .getText();
        assert.equal(errorResponse, "Beneficiary already exists.");
        const okButton = await driver.findElement(By.id("failed_OkButtonText"));
        await okButton.click();
      });

      it("has beneficiaries", async function () {
        const beneficiaryElements = await driver.findElements(
          By.className("accountBeneficiaries")
        );
        assert.notEqual(beneficiaryElements.length, 0);
      });

      it("has specific beneficiary", async function () {
        const beneficiaryElements = await driver.findElements(
          By.className("accountBeneficiaries")
        );
        let familyMembers = [];
        for (let e of beneficiaryElements) {
          familyMembers.push(await e.getText());
        }
        const filteredMembers = familyMembers.filter(
          (member) => member === process.env.REACT_APP_BENEFICIARY
        );
        assert.equal(filteredMembers[0], process.env.REACT_APP_BENEFICIARY);
      });

      it("can remove specific beneficiary", async function () {
        const beneficiaryElements = await driver.findElements(
          By.className("accountBeneficiaries")
        );
        for (let e of beneficiaryElements) {
          const text = await e.getText();
          if (text === process.env.REACT_APP_BENEFICIARY) {
            const element = await e.findElement(
              By.id("RemoveBeneficiaryAccount")
            );
            await element.click();
            break;
          }
        }

        const okButton = await driver.findElement(By.id("removeBeneficiary"));
        await okButton.click();
        await driver.sleep(3000);

        const newBeneficiaryElements = await driver.findElements(
          By.className("accountBeneficiaries")
        );
        let familyMembers = [];
        for (let e of newBeneficiaryElements) {
          familyMembers.push(await e.getText());
        }
        const beneficiariesList = familyMembers.filter(
          (member) => member === process.env.REACT_APP_BENEFICIARY
        );
        assert.equal(beneficiariesList.length, 0);

        // TODO : Check success dialogue has opened
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
