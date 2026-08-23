const nanoid = require("nanoid");
const { URL } = require("../models/url")

async function generateNewShortUrl(req, res) {
  const body = req.body;
  if(!body || !body.url) return res.status(400).json({error: "url is required"});

  const url = body.url;
  const shortId = nanoid.nanoid(8);

  await URL.create({
    shortUrl: shortId,
    redirectUrl: url,
    visitHistory: [],
  });

  return res.render("home", {
    id: shortId,
  });
}

async function getShortUrl(req, res) {
  const shortUrl = req.params.shortId;

  const entry = 
  await URL.findOneAndUpdate({
    shortUrl
  }, {
    $push: {
      visitHistory: { timestamp: Date.now() }
    }
  });

  if(!entry || !entry.redirectUrl) return res.status(404).json({status: "url not found!"});

  return res.status(301).redirect(entry.redirectUrl);
}

async function getAnalytics(req, res) {
  const shortUrl = req.params.shortId;
  if(!shortUrl) return res.status(404).json({status:"short id required"});

  const entry = await URL.findOne({ shortUrl });
  if(!entry) return res.status(404).json({status:"invalid short id"});

  return res.status(200)
  .json({ 
    url: entry.redirectUrl,
    clicks: entry.visitHistory.length,
    analytics: entry.visitHistory 
  });
}

async function getAllUsers (req, res) {
  const allUrls = await URL.find({});
  // render the appropriate view using ejs
  return res.render("home", {
    urls: allUrls,
  });
}


module.exports = {
  generateNewShortUrl,
  getShortUrl,
  getAnalytics,
  getAllUsers,
}