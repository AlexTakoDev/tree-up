const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function postOneSoft_skillSchema(req, res, next){
    const postOneSoft_skillSchema = Joi.object({
        user : Joi.object().required(),
        soft_skill : Joi.object({
            name : Joi.string().required(),
            description : Joi.string().required(),
        }).required()
    });
    schemaValidator(req, postOneSoft_skillSchema, next);
}

module.exports = postOneSoft_skillSchema;