const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

function testPostProfileSchema(req, res, next){
//schema de l'objet experience
    const experienceSchema = Joi.object({
        name : Joi.string().required(),
        date_start: Joi.date().iso().required(),
        date_end : Joi.date().iso(),
        description : Joi.string().required(),
        place : Joi.string().required()
    });
//schema de l'objet soft_skill
    const soft_skillSchema = Joi.object({
        name : Joi.string().required(),
        description : Joi.string().required(),
    });
//shema de de verification des donner en entré de la route
    const testPostProfileSchema = Joi.object({
        description : Joi.string().empty('').required(),
        date_birth : Joi.date().iso().required(),
        city : Joi.string().required(),
        work : Joi.string().required(),
        uuid_user : Joi.string().required(),
        experience : Joi.array().items(experienceSchema),//appelle du shema experience
        soft_skill : Joi.array().items(soft_skillSchema)//appelle du schema soft_skill
    });
//appelle function de validation de du shema 
    schemaValidator(req, testPostProfileSchema, next);
}

module.exports = testPostProfileSchema;