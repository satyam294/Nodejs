const jwt = require("jsonwebtoken");
const authKey = "Satyam@Server#123";

function generateUserToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  }
  return jwt.sign(payload, authKey);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, authKey);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateUserToken,
  verifyToken,
}