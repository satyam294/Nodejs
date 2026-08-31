const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  shortUrl: {
    type: String,
    unique: true,
    required: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  visitHistory: [{ timestamp: { type: Number } }]
  }, { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);   // collection name: "urls"

module.exports = {
  URL,
}
