const Joi = require('joi');
const schemaValidator = require('../middleware/schemaValidatorMiddleware');

const create = (req, res, next) => {
    const joiCreatecollaborators = Joi.object({
        project_uuid: Joi.string().required().min(3).max(50),
        collaborators: Joi.array()
    });
    schemaValidator(req, joiCreatecollaborators, next);
}

module.exports = {
    create,
}