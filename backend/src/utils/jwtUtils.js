const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "123";

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, isSuperuser: user.isSuperuser }, secretKey, {
    expiresIn: "72h",
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};
