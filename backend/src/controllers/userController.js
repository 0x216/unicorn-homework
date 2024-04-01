const bcrypt = require("bcrypt");
const User = require("../database/models/user");
const { hashPassword } = require("../utils/passwordUtils");
const { generateToken } = require("../utils/jwtUtils");

exports.login = async (req, res) => {
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint to sign in.'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Login Credentials',
            schema: { $ref: "#/definitions/LoginRequest" }
      }
      #swagger.responses[200] = {
            description: "Login successful, JWT token returned.",
            schema: { $ref: "#/definitions/LoginSuccessResponse" }
      }
      #swagger.responses[400] = { description: "Invalid password." }
      #swagger.responses[404] = { description: "User not found." }
      #swagger.responses[500] = { description: "Internal server error." }
  */
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
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint to register.'
      #swagger.responses[201] = { description: "User created successfully." }
      #swagger.responses[409] = { description: "Email already in use." }
      #swagger.responses[500] = { description: "Internal server error." }
  */
  const { name, email, password } = req.validatedBody;
  /*  #swagger.parameters['userinfo'] = {
                in: 'body',
                description: 'User information.',
                required: true,
                schema: { $ref: "#/definitions/AddUser" }
        } */
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).send({ message: "Email already in use." });
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });

  const userResponse = { ...user.get(), password: undefined };
  return res.status(201).send(userResponse);
};

exports.update_password = async (req, res) => {
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint to change your password.'
      #swagger.security = [{
           "BearerAuth": []
      }]
      #swagger.parameters['body'] = {
          in: 'body',
          description: 'New and old password',
          required: true,
          schema: { $ref: "#/definitions/UpdatePasswordRequest" }
      }
      #swagger.responses[200] = { 
          description: "Password updated successfully." 
      }
      #swagger.responses[400] = { 
          description: "Invalid password provided." 
      }
      #swagger.responses[404] = { 
          description: "User not found." 
      }
      #swagger.responses[500] = { 
          description: "Internal server error." 
      }
  */
  const { new_password, old_password } = req.validatedBody;

  const user = await User.findByPk(req.user.id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  let isMatch = await bcrypt.compare(old_password, user.password);
  if (!isMatch) {
    return res.status(400).send({ message: "Invalid password" });
  }

  const hashedPassword = await hashPassword(new_password);
  user.password = hashedPassword;

  await user.save();

  return res.send({ message: "Password updated successfully" });
};

exports.update = async (req, res) => {
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint to update current user info.'
      #swagger.security = [{
           "BearerAuth": []
      }]
      #swagger.responses[200] = { description: "User info updated successfully." }
      #swagger.responses[404] = { description: "User not found." }
      #swagger.responses[500] = { description: "Internal server error." }
  */
  const { name } = req.validatedBody;

  const user = await User.findByPk(req.user.id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  user.name = name.trim();
  await user.save();

  const { password, isSuperuser, ...safeUserDetails } = user.get();
  return res.send(safeUserDetails);
};

exports.delete = async (req, res) => {
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint to delete user (Require superuser permission).'
      #swagger.security = [{
           "BearerAuth": []
      }]
      #swagger.responses[200] = { description: "User deleted successfully." }
      #swagger.responses[404] = { description: "User not found." }
      #swagger.responses[500] = { description: "Internal server error." }
  */
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  await user.destroy();
  return res.send({ message: "User deleted successfully" });
};

exports.getMe = async (req, res) => {
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint to get info about current user.'
      #swagger.security = [{
           "BearerAuth": []
      }]
      #swagger.responses[200] = { description: "Current user info retrieved successfully." }
      #swagger.responses[401] = { description: "Not authorized or token expired." }
      #swagger.responses[500] = { description: "Internal server error." }
  */
  const user = await User.findByPk(req.user.id);
  if (!user) {
    return res.status(401).send({ message: "Not authorized or token expire" });
  }

  const { password, isSuperuser, ...userData } = user.get();
  return res.send(userData);
};
