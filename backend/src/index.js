require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const Trend = require("../lib/model");
const seleniumScript = require("../src/seleniumScript");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/trendingTopics", async (req, res) => {
  const trends = await fetchTrendingTopics();
  if (trends) {
    res.json({ trends });
  } else {
    res.status(404).json({ message: "No trending topics found." });
  }
});

app.get("/savedTrends", async (req, res) => {
  try {
    const savedTrends = await Trend.find();
    if (savedTrends && savedTrends.length > 0) {
      res.json(savedTrends);
    } else {
      res.status(404).json({ message: "No saved trends found." });
    }
  } catch (error) {
    console.error("Error fetching saved trends:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching saved trends." });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening of PORT ${PORT}`);
});

async function fetchTrendingTopics() {
  try {
    const { trends } = await seleniumScript();
    console.log(trends);
    if (trends && trends.length > 0) {
      const newTrend = new Trend({
        trends: trends,
        ipAddress: "192.168.1.1",
      });

      const savedTrend = await newTrend.save();
      console.log("New trending topics saved:", savedTrend);
      return trends;
    } else {
      console.log("No trends found, skipping save.");
      return null;
    }
  } catch (error) {
    console.error("Error saving trending topics:", error);
    return null;
  }
}
