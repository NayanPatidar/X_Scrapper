require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

const url = process.env.MONGOURI;

if (!url) {
  console.error("Error: MONGO_URI is not defined in your .env file.");
  process.exit(1);
}

mongoose
  .connect(url)
  .then(() => {
    console.log("DB Successfully Connected !!");
  })
  .catch((err) => {
    console.log(`Failed to connect ${err}`);
  });

module.exports = mongoose;
