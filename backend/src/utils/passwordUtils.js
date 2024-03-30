const bcrypt = require("bcrypt");
const validator = require("validator");

const saltRounds = 10;

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

exports.validatePassword = (password) => {
  return (
    validator.isLength(password, { min: 8 }) &&
    validator.matches(password, /\d/) &&
    validator.matches(password, /[A-Z]/)
  );
};
