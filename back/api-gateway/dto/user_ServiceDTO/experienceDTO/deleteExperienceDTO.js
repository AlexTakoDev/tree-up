const Joi = require('joi');
const schemaValidator = require('../../../middleware/testMiddleware');

//shema de de verification des donner en entré de la route
function deleteExperienceSchema(req, res, next){
    const deleteExperienceSchema = Joi.object({
        uuid : Joi.string().guid().required()
    });

    schemaValidator(req, deleteExperienceSchema, next);
}

module.exports = deleteExperienceSchema;