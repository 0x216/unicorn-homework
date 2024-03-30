const bcrypt = require("bcrypt");
const User = require("../database/models/user");
const { hashPassword, validatePassword } = require("../utils/passwordUtils");
const { generateToken } = require("../utils/jwtUtils");

exports.login = async (req, res) => {
  const { email, password } = req.validatedBody;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ message: "Invalid password" });
  }

  const token = generateToken(user);
  return res.send({ token });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.validatedBody;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).send({ message: "Email already in use." });
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });

  const userResponse = { ...user.get(), password: undefined };
  return res.status(201).send(userResponse);
};

exports.update = async (req, res) => {
  const { name } = req.validatedBody;

  const userId = req.user.id;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  user.name = name.trim();
  await user.save();

  const { password, isSuperuser, ...safeUserDetails } = user.get();
  return res.send(safeUserDetails);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  await user.destroy();
  return res.send({ message: "User deleted successfully" });
};

exports.getMe = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const { password, isSuperuser, ...userData } = user.get();
  return res.send(userData);
};
