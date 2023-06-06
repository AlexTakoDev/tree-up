const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function deleteOneExperienceSchema(req, res, next){
    const deleteOneExperienceSchema = Joi.object({
        user : Joi.object().required(),
        uuid_experience : Joi.string().guid().required()
    });
    schemaValidator(req, deleteOneExperienceSchema, next);
}

module.exports = deleteOneExperienceSchema;