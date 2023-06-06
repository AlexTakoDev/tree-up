const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function updateOneExperienceSchema(req, res, next){
    const updateOneExperienceSchema = Joi.object({
        user : Joi.object().required(),
        experience : Joi.object({
            name : Joi.string().required().min(3).max(40),
            date_start: Joi.date().iso().required(),
            date_end : Joi.date().iso().allow(''),
            description : Joi.string().required().min(3),
            place : Joi.string().required().min(3),
            uuid : Joi.string().required()
        }).required()
    });
    schemaValidator(req, updateOneExperienceSchema, next);
}

module.exports = updateOneExperienceSchema;