const Joi = require('joi');
const schemaValidator = require('../../middleware/schemaValidator');

function testSchema(req, res, next){
// schema de vérification des données en entrée de la route
    const testSchema = Joi.object({
        name: Joi.string().required()
    });
    //appel function de validation du schema 
    schemaValidator(req, testSchema, next);
}

module.exports = testSchema