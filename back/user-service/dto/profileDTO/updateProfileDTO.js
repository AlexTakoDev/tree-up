const { required } = require('joi');
const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function updateProfileSchema(req, res, next) {

    const updateProfileSchema = Joi.object({
        lastname: Joi.string().min(3).required(),
        firstname: Joi.string().min(3).required(),
        username: Joi.string().min(3).required(),
        password: Joi.string(),
        oldPassword: Joi.string().min(8).allow(""),
        newPassword: Joi.string().min(8).allow(""),
        confirmPassword: Joi.string().min(8).allow(""),
        description: Joi.string().allow(""),
        work: Joi.string().allow(''),
        date_birth: Joi.date().iso().allow("").allow(null),
        city: Joi.string().min(8),
        user: Joi.string().required(),
    });
    console.log(schemaValidator.error);
    schemaValidator(req, updateProfileSchema, next);
}

module.exports = updateProfileSchema;