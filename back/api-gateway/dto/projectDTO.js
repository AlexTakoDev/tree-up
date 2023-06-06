const Joi = require('joi');
const schemaValidator = require('../middleware/schemaValidatorMiddleware');

const create = (req, res, next) => {
  const joiCreateProject = Joi.object({
    name: Joi.string().required().min(3).max(50),
    date_start: Joi.date().required().iso(),
    date_end: Joi.date().iso(),
    description: Joi.string().required().min(100).max(5000),
    uuid_type: Joi.string().guid({ version: 'uuidv4' }).required(),
  });
  schemaValidator(req, joiCreateProject, next);
}

const update = (req, res, next) => {
  const joiUpdateProject = Joi.object({
    name: Joi.string().required().min(3).max(50),
    date_start: Joi.date().required().iso(),
    date_end: Joi.date().iso(),
    description: Joi.string().required().max(5000),
    uuid_type: Joi.string().guid({ version: 'uuidv4' }).required(),
  });

  const joiParams = Joi.object({
    uuid: Joi.string().guid({ version: 'uuidv4' }).required(),
  });

  const { error: paramsError } = joiParams.validate(req.params);
  if (paramsError) {
    return res.status(400).json({ error: paramsError.details[0].message });
  }

  const { error: updateError } = joiUpdateProject.validate(req.body);
  if (updateError) {
    return res.status(400).json({ error: updateError.details[0].message });
  }

  next();
};

const get = (req, res, next) => {
  const joiParams = Joi.object({
    uuid: Joi.string().guid({ version: "uuidv4" }).required(),
  });

  const { error: paramsError } = joiParams.validate(req.params);
  if (paramsError) {
    return res.status(400).json({ error: paramsError.details[0].message });
  }
  next();
}

const getAll = (req, res, next) => {
  const joiParams = Joi.object({
    blacklistIds: Joi.array().items(Joi.string().guid({ version: "uuidv4" })),
  });

  const { error: paramsError } = joiParams.validate(req.body);
  if (paramsError) {
    return res.status(400).json({ error: paramsError.details[0].message });
  }
  next();
}

const remove = (req, res, next) => {
  const joiParams = Joi.object({
    uuid: Joi.string().guid({ version: "uuidv4" }),
  });

  const { error: paramsError } = joiParams.validate(req.params);
  if (paramsError) {
      return res.status(400).json({ error: paramsError.details[0].message });
  }
  next();
};


module.exports = {
    create,
    update,
    get,
    getAll,
    remove,
}