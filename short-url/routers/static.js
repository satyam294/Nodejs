// this router represnts the base/ home page of the application => request on '/'
const express = require("express");
const { URL } = require("../models/url");

const router = express.Router();

router.get('/', async (req, res) => {
  const urls = await URL.find({});
  return res.render("home", {
    urls: urls,
  });
});

module.exports = {
  staticRouter: router,
}