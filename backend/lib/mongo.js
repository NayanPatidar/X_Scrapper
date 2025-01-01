const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const url = process.env.MONGO_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("DB Successfully Connected !!");
  })
  .catch((err) => {
    console.log(`Failed to connect ${err}`);
  });

module.exports = mongoose;
