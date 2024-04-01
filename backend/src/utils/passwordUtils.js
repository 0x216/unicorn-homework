const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};
