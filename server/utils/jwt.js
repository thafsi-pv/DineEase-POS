const jwt = require("jsonwebtoken");

const generateJWTToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = { generateJWTToken, verifyToken };
