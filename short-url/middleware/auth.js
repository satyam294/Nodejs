const { getUserSession } = require("../service/auth")

async function forceAuth(req, res, next) {
  const sessionId = req.cookies.uid;

  if(!sessionId || !getUserSession(sessionId)) {
    return res.redirect("/login");
  }

  req.user = getUserSession(sessionId);
  next();
}

// if the request is authentic, attaches the user object to the req
// otherwise, req.user becomes undefined
async function checkAuth(req, res, next) {
  const sessionId = req.cookies.uid;
  req.user = getUserSession(sessionId);  // might be a user, might be undefined
  next(); 
}

module.exports = {
  forceAuth,
  checkAuth,
}