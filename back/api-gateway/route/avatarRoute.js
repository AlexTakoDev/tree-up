const express = require("express");
const router = express.Router();
require("dotenv").config();
const DTO = require("../dto/dtos");
const { avatarController } = require("../controller/controllers");
const auth = require("../middleware/auth");
const upload = require('../middleware/fileUpload')

router.post("/postavatar/image",auth,upload.avatarUpload.single('image') , avatarController.postAvatarController);

router.get("/getavatar/:uuid", avatarController.getAvatarController);

router.get("/deleteavatar/",auth, avatarController.deleteAvatarController);

module.exports = router;