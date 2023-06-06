const Joi = require('joi')

//function de qui valide si les données en entré de la route correspondes au schema
module.exports = function(req, schema, next) {
    const options = {
        abortEarly: false,
        allowUnknown: true, 
        stripUnknown: true 
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    } 
}; 