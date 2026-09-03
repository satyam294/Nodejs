// this router represnts the base/ home page of the application => request on '/'
const express = require("express");
const { URL } = require("../models/url");

const router = express.Router();

router.get('/', async (req, res) => {
  const user = req.user;  // might be undefined based on authentication status
  if(!user) return res.redirect("/login");

  const shortId = req.query.shortId;
  const error = req.query.error;

  const UserUrls = await URL.find({createdBy: user._id});
  return res.render("home", {
    urls: UserUrls,
    shortId: shortId || null,
    error: error || null,
  });
});

router.get('/signup', async (req, res) => {
  return res.render("signup");
});

router.get('/login', async (req, res) => {
  return res.render("login");
});

module.exports = {
  staticRouter: router,
}