const express = require('express');
const router = express.Router();
require('dotenv').config()
const DTO = require('../dto/dtos')
const { likeController } = require('../controller/controllers');
const auth = require('../middleware/auth');

// url route microservice user
const POSTLIKE = process.env.API_ADDRESS+"/postlike";

// route : url , dto , controller
router.post(POSTLIKE, DTO.postLike, auth, likeController.postLikeController );

module.exports = router;