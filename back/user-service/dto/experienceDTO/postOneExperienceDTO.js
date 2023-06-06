const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function postOneExperienceSchema(req, res, next){
    const postOneExperienceSchema = Joi.object({
        user : Joi.object().required(),
        experience : Joi.object({
            name : Joi.string().required().min(3).max(40),
            date_start: Joi.date().iso().required(),
            date_end : Joi.date().iso().allow(''),
            description : Joi.string().required().min(3),
            place : Joi.string().required().min(3),
        })
    });
    schemaValidator(req, postOneExperienceSchema, next);
}

module.exports = postOneExperienceSchema;