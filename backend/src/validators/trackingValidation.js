const Joi = require("joi");

const createValidation = Joi.object({
  cigarettesPerDay: Joi.number().integer().min(1).max(100).required(),
  cost: Joi.number().min(0).max(1000).required(),
});

module.exports = {
  createValidation,
};
