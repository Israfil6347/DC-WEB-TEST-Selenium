const { suite } = require("selenium-webdriver/testing");
const { Browser, By, Select } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();

suite(
  function (env) {
    describe("Family and Relative", function () {
      let driver;

      before(async function () {
        let options = new chrome.Options();
        driver = await env.builder().setChromeOptions(options).build();
        driver.manage().window().maximize();
        await driver.manage().setTimeouts({ implicit: 500 });
      });

      after(async () => await driver.quit());

      it("opened family and relative page correctly", async function () {
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
        const familyMenu = await driver.findElement(
          By.id("family_and_relatives")
        );
        await familyMenu.click();
        await driver.sleep(2000);
        const myInfoUrl =
          (await process.env.REACT_APP_BASE_URL) + "info/family_and_relatives";
        let currentUrl = await driver.getCurrentUrl();

        assert.equal(currentUrl, myInfoUrl);
        await driver.sleep(2000);
      });

      it("has relative search by account input and search button", async function () {
        const searchInput = await driver.findElement(By.id("relativeSearch"));
        const searchInputTag = await searchInput.getTagName();
        assert.equal(searchInputTag, "input");
        await searchInput.sendKeys(
          await process.env.REACT_APP_TRANSACTION_ACCOUNT
        );
        const searchButton = await driver.findElement(
          By.css("button[type='submit']")
        );
        const searchButtonTag = await searchInput.getTagName();
        assert.equal(searchButtonTag, "input");
        await searchButton.click();
        await driver.sleep(2000);
      });

      it("has has correct account holder name", async function () {
        const accountHolder = await driver.findElement(
          By.id("AccountHolderName")
        );
        const accountHolderText = await accountHolder.getAttribute("value");
        assert.equal(
          accountHolderText,
          process.env.REACT_APP_TRANSACTION_ACCOUNT_NAME
        );
      });

      it("has relationship selection", async function () {
        const selectOptionInput = driver.findElement(
          By.css("select[name=RelationTypeCode]")
        );
        const select = new Select(selectOptionInput);
        const twoElement = await driver.findElement(
          By.css("option[value='05']")
        );
        await select.selectByValue("05");
        assert.equal(true, await twoElement.isSelected());
      });

      it("has add family member button", async function () {
        const addFamilyButton = await driver.findElement(
          By.id("AddFamilyMember")
        );
        const addFamilyButtonText = await addFamilyButton.getText();
        assert.equal(addFamilyButtonText, "ADD FAMILY MEMBER");
      });

      // TODO If already exist



      // TODO If requested family is him/her self

      

      it("can add family member successfully", async function () {
        const addFamilyButton = await driver.findElement(
          By.id("AddFamilyMember")
        );
        await addFamilyButton.click();

        await driver.sleep(2000);

        const familyMembers = await driver.findElements(
          By.className("familyAndRelativesChild")
        );
        let fMembers = [];
        for (let e of familyMembers) {
          fMembers.push(await e.getText());
        }
        const findMembers = fMembers.filter(
          (member) => member === process.env.REACT_APP_FAMILY_MEMBER
        );
        assert.equal(findMembers[0], process.env.REACT_APP_FAMILY_MEMBER);
      });

      it("has family members", async function () {
        const familyMembers = await driver.findElements(
          By.className("familyAndRelativesChild")
        );
        assert.notEqual(familyMembers.length, 0);
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
