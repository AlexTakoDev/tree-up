const Joi = require('joi');
const schemaValidator = require('../../../middleware/testMiddleware');

//shema de de verification des donner en entré de la route
function newSoft_skillSchema(req, res, next){
    const soft_skillSchema = Joi.object({
        name : Joi.string().required(),
        description : Joi.string().required(),
    });

    schemaValidator(req, soft_skillSchema, next);
}

module.exports = newSoft_skillSchema;