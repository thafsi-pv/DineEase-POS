const bcrypt = require("bcrypt");

const SALT = 10;
const hashPassword = (password) => {
  return bcrypt.hash(password, SALT);
};

const comparePassword = (password, hashPass) => {
  return bcrypt.compare(password, hashPass);
};

module.exports = { hashPassword, comparePassword };
