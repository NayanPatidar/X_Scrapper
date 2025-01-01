const { Builder, By, until } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const chrome = require("selenium-webdriver/chrome");
const dotenv = require("dotenv");
dotenv.config();

const twitterUsername = process.env.USERNAME;
const twitterPassword = process.env.PASSWORD;
const proxyMesh = process.env.PROXYMESH;

function setupOptions() {
  const options = new Options();
  const user_agent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.89 Safari/537.36";
  options.addArguments(`--user-agent=${user_agent}`);
  options.addArguments("--no-sandbox");
  options.addArguments("--headless");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--disable-gpu");
  // console.log(`--proxy-server=http://${proxyMesh}`);

  // if (proxyMesh) {
  //   const proxyUrl = `http://${proxyMesh}`;
  //   options.addArguments(`--proxy-server=${proxyUrl}`);
  // }
  return options;
}

async function setupDriver() {
  return await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(setupOptions())
    .build();
}

async function getPublicIp() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address:", error.message);
    return "Unknown IP";
  }
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
  let topics = [];
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
    const trends = await fetchTrendingTopics(driver);
    return { trends };
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

module.exports = seleniumScript;
