const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

//shema de de verification des donner en entré de la route
function deleteOneSoft_skillSchema(req, res, next){
    const deleteOneSoft_skillSchema = Joi.object({
        user : Joi.object().required(),
        uuid_soft_skill : Joi.string().guid().required()
    });
    schemaValidator(req, deleteOneSoft_skillSchema, next);
}

module.exports = deleteOneSoft_skillSchema;