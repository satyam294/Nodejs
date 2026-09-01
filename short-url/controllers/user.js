const { User } = require("../models/user");
//const { v4: uuidv4 } = require("uuid");
//const { setUserSession, getUserSession } = require("../service/auth");
const { generateUserToken } = require("../service/auth_jwt");

async function handleUserSignup(req, res) {
  const { name, email, password } =  req.body;
  User.create({
    name,
    email,
    password
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } =  req.body;
  const user = await User.findOne({email, password});

  if(!user) {
    return res.render("login", {
      error: "Invalid username or password!"
    })
  }
  // const sessionId = uuidv4();
  // // map session id to the user using auth service
  // setUserSession(sessionId, user);
  // res.cookie('uid', sessionId);

  const token = generateUserToken(user);
  res.cookie('uid', token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
}