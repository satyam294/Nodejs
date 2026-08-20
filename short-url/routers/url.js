const express = require("express");
const { URL } = require("../models/url");
const { generateNewShortUrl, getShortUrl, getAnalytics } = require("../controllers/url");

const router = express.Router();

router.post('/', generateNewShortUrl);

router.get('/analytics/:shortId', getAnalytics);

router.get('/:shortId', getShortUrl);

module.exports = {
  urlRouter: router,
}