const Joi = require('joi');
const schemaValidator = require('../../../middleware/testMiddleware');

//shema de de verification des donner en entré de la route
function UpdateExperienceSchema(req, res, next){
    const experienceSchema = Joi.object({
        name : Joi.string().required().min(3).max(40),
        date_start: Joi.date().iso().required(),
        date_end : Joi.date().iso().allow(''),
        description : Joi.string().required().min(3),
        place : Joi.string().required().min(3),
        uuid : Joi.string().required()
    });

    schemaValidator(req, experienceSchema, next);
}

module.exports = UpdateExperienceSchema;