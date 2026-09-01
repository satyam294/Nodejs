//const { getUserSession } = require("../service/auth");
const { verifyToken } = require("../service/auth_jwt");

async function forceAuth(req, res, next) {
  //const sessionId = req.cookies.uid;
  const token = req.cookies.uid;

  if (!token) return res.redirect("/login");

  const user = verifyToken(token);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

// if the request is authentic, attaches the user object to the req
// otherwise, req.user becomes undefined
async function checkAuth(req, res, next) {
  // const sessionId = req.cookies.uid;
  // req.user = getUserSession(sessionId);  // might be a user, might be undefined
  // next(); 
  const token = req.cookies.uid;
  req.user = token ? verifyToken(token) : null;
  next(); 
}

module.exports = {
  forceAuth,
  checkAuth,
}