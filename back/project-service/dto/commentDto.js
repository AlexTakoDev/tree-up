const Joi = require("joi");
const schemaValidator = require("../middleware/schemaValidatorMiddleware");

//shema de de verification des donner en entré de la route
const post = (req, res, next) => {
  const post = Joi.object({
    comment: Joi.string().required().min(2).max(500),
    uuid_user: Joi.string().required(),
    uuid_project: Joi.string().required(),
  });
  schemaValidator(req, post, next);
};

const update = (req, res, next) => {
  const update = Joi.object({
    uuid: Joi.string().required(),
    comment: Joi.string().required().min(2).max(500),
    uuid_user: Joi.string().required(),
  });
  schemaValidator(req, update, next);
};

module.exports = {
  post,
  update,
};
