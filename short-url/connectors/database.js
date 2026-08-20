const mongoose = require("mongoose");

async function connectDb(url) {
  await mongoose.connect(url);
  console.log("Database connected...")
}

module.exports = {
  connectDb,
}