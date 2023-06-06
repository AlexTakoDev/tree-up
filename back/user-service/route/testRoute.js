const express = require('express');
const router = express.Router();
require('dotenv').config();
const testController = require('../controller/testController');
const validator = require('../middleware/schemaValidator');
const DTO = require('../dto/dtos');


//definitions des routes : url , dto , controller
router.get('/test', DTO.test, testController.testController );

router.post('/testpost',DTO.testPost, testController.testpostController);

router.post('/testpostprofile',DTO.testProfile, testController.testPostProfile);

module.exports = router

