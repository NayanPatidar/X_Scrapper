const express = require("express");
const {} = require("../src/seleniumScript");
const Trend = require("../lib/model");
const seleniumScript = require("../src/seleniumScript");
const app = express();
const PORT = 3000;

app.get("/trendingTopics", (req, res) => {});

app.listen(PORT, () => {
  console.log(`App is listening of PORT ${PORT}`);
});

async function fetchTrendingTopics() {
  const trends = seleniumScript();
  const newTrend = new Trend({
    trends: trends,
    ipAddress: ipAddress,
  });

  try {
    const savedTrend = await newTrend.save();
    console.log("New trending topics saved:", savedTrend);
  } catch (error) {
    console.error("Error saving trending topics:", error);
  }
}
