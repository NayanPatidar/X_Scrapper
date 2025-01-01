const mongoose = require("./mongo");
const {v4 : uuidv4} = require("uuid");

const trendSchema = new mongoose.Schema({
  uniqueId: { type: String, default: uuidv4 },
  trends: [String],
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String, required: true },
});

const Trend = mongoose.model("TrendingTopics", trendSchema);

module.exports = Trend;
