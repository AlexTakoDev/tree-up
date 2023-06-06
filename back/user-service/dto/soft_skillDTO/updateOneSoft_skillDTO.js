const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function updateOneSoft_skillSchema(req, res, next){
    const updateOneSoft_skillSchema = Joi.object({
        user : Joi.object().required(),
        soft_skill : Joi.object({
           name : Joi.string().required(),
            description : Joi.string().required(),
            uuid : Joi.string().required() 
        }).required()
    });
    schemaValidator(req, updateOneSoft_skillSchema, next);
}

module.exports = updateOneSoft_skillSchema;