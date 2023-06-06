const Joi = require('joi');
const schemaValidator = require('../middleware/testMiddleware.js');


function testSchema(req, res, next){
//shema de de verification des donner en entré de la route
    const testSchema = Joi.object({
        name: Joi.string().required()
    });
    //appelle function de validation de du shema 
    schemaValidator(req, testSchema, next)
}



module.exports = testSchema