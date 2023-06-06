const Joi = require("joi");
const schemaValidator = require("../../middleware/schemaValidator");

const signin = (req, res, next) => {
  const signin = Joi.object({
    email: Joi.string().email().lowercase().required(),
    lastname: Joi.string().min(3).required(),
    firstname: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  });
  schemaValidator(req, signin, next);
};

const login = (req, res, next) => {
  const login = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
  });
  schemaValidator(req, login, next);
};

module.exports = {
  signin,
  login,
};
