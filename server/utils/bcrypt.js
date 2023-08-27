const bcrypt = require("bcrypt");

const SALT = 10;
const generateHashPassword = (password) => {
  return bcrypt.hash(password, SALT);
};

const comparePassword = (password, hashPass) => {
  return bcrypt.compare(password, hashPass);
};

module.exports = { generateHashPassword, comparePassword };
