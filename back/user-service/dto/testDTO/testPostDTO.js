const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function testPostSchema(req, res, next){
    const testPostSchema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(12).required(),
        username: Joi.string().min(3).required(),
        firstname: Joi.string().min(3),
        lastname: Joi.string().min(3)
    });
    schemaValidator(req, testPostSchema, next);
}

module.exports = testPostSchema;