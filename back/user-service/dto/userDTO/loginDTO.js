const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function loginDTO(req, res, next) {
    const loginDTO = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(8).required(),
    });
    schemaValidator(req, loginDTO, next);
}

module.exports = loginDTO;