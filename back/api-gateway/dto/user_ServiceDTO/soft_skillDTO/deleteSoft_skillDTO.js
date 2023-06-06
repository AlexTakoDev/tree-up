const Joi = require('joi');
const schemaValidator = require('../../../middleware/testMiddleware');

//shema de de verification des donner en entré de la route
function deleteSoft_skillSchema(req, res, next){
    const deleteSoft_skillSchema = Joi.object({
        uuid : Joi.string().guid().required()
    });

    schemaValidator(req, deleteSoft_skillSchema, next);
}

module.exports = deleteSoft_skillSchema;