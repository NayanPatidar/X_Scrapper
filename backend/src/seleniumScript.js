const { Builder, By, until } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const chrome = require("selenium-webdriver/chrome");

const twitterUsername = "nayanpatidar128@gmail.com";
const twitterPassword = "";

function setupOptions() {
  const options = new Options();
  options.addArguments("--headless");
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--disable-gpu");
  return options;
}

async function setupDriver() {
  return await new Builder()
    .forBrowser("chrome")
    // .setChromeOptions(setupOptions())
    .build();
}

async function loginToX(driver) {
  await driver.get("https://x.com/i/flow/login");
  await driver.sleep(5000);
  const usernameField = await driver.findElement(
    By.xpath("//input[@name='text']")
  );
  await usernameField.sendKeys(twitterUsername);

  const nextButton = await driver.findElement(
    By.xpath("//span[text()='Next']")
  );
  await nextButton.click();

  await driver.sleep(5000);

  const passwordField = await driver.findElement(
    By.xpath("//input[@name='password']")
  );
  await passwordField.sendKeys(twitterPassword);

  const loginButton = await driver.findElement(
    By.xpath("//span[text()='Log in']")
  );
  await loginButton.click();

  await driver.sleep(5000);
  console.log("Logged in successfully!");
}

async function fetchTrendingTopics(driver) {
  try {
    const trendElements = await driver.wait(
      until.elementsLocated(By.xpath("//div[@data-testid='trend']")),
      10000
    );

    for (let i = 0; i < Math.min(4, trendElements.length); i++) {
      const topicElement = await trendElements[i].findElement(
        By.xpath(".//div[contains(@class, 'r-b88u0q')]")
      );
      const topicText = await topicElement.getText();
      if (topicText) {
        topics.push(topicText.trim());
      }
    }
  } catch (error) {
    console.error("Error while fetching trending topics:", error);
  }
  return topics;
}

async function seleniumScript() {
  let driver;
  try {
    driver = await setupDriver();
    await loginToX(driver);
    const trendingTopics = await fetchTrendingTopics(driver);
    return trendingTopics;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

module.exports = seleniumScript;
