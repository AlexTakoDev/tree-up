const Joi = require('joi');
const schemaValidator = require('../../middleware/testMiddleware');

//shema de de verification des donner en entré de la route
function postLikeDTO(req, res, next){
    const postLikeDTOSchema = Joi.object({
        uuid_project : Joi.string().required().allow(''),
    });
    schemaValidator(req, postLikeDTOSchema, next);
}

module.exports = postLikeDTO;