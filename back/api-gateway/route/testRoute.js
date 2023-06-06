const express = require('express');
const router = express.Router();
require('dotenv').config()
const DTO = require('../dto/dtos')
const { testController } = require('../controller/controllers')

// url route test microservice user
const TREE_UP = process.env.API_ADDRESS+"/test";

// route : url , dto , controller
router.get(TREE_UP, DTO.test, testController.testController);
router.post(TREE_UP, testController.testController);

module.exports = router;
