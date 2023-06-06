const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function signinDTO(req, res, next) {
    console.log(req.body, 'test dtosignin')
    const signinDTO = Joi.object({
        email: Joi.string().email().lowercase().required(),
        lastname: Joi.string().min(3).required(),
        firstname: Joi.string().min(3).required(),
        username: Joi.string().min(3).required(),
        password: Joi.string().min(8).required(),

    });
    schemaValidator(req, signinDTO, next);
}

module.exports = signinDTO;