const Joi = require('joi');
const schemaValidator = require('../middleware/shemaValidator');

//shema de de verification des donner en entré de la route
function getIsLikedDTO(req, res, next){
    const getIsLikedDTOSchema = Joi.object({
        user : Joi.object().required(),
        uuid_project : Joi.string().required(),
    });
    schemaValidator(req, getIsLikedDTOSchema, next);
}

module.exports = getIsLikedDTO;