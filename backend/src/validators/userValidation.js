const Joi = require("joi");

const email = Joi.string().email().max(256).required();
const password = Joi.string()
  .min(8)
  .max(32)
  .required()
  .pattern(new RegExp("(?=.*[A-Z])"))
  .pattern(new RegExp("(?=.*[!@#$%^&*])"))
  .messages({
    "string.pattern.base":
      "Password must contain at least one uppercase letter and one special character",
  });

const registerValidation = Joi.object({
  name: Joi.string().min(1).max(64).optional(),
  email,
  password,
});

const loginValidation = Joi.object({
  email,
  password: Joi.string().required(),
});

const updateValidation = Joi.object({
  name: Joi.string().min(1).max(64).optional(),
});

const updatePasswordValidation = Joi.object({
  new_password: password,
  old_password: Joi.string().required(),
});

module.exports = {
  registerValidation,
  loginValidation,
  updateValidation,
  updatePasswordValidation,
};
