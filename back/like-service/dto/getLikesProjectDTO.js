const Joi = require('joi');
const schemaValidator = require('../middleware/shemaValidator');

//shema de de verification des donner en entré de la route
function getLikesProjectDTO(req, res, next){
    const getLikesProjectDTOSchema = Joi.object({
        uuid_project : Joi.string().required().allow(''),
    });
    schemaValidator(req, getLikesProjectDTOSchema, next);
}

module.exports = getLikesProjectDTO;