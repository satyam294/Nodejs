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

function restrictTo(roles) {
  async function authorization(req, res, next) {
    const user = req.user;
    if(!user || !roles.includes(user.role)) 
      return res.redirect("/?error=" + encodeURIComponent("Unauthorized access"));
  
    next();  // allowed roles contains current user's roles
  }
  return authorization;
}

module.exports = {
  forceAuth,
  checkAuth,
  restrictTo,
}