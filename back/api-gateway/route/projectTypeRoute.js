const express = require("express");
const router = express.Router();
require("dotenv").config();

const Controller = require("../controller/controllers");

router.get('/', Controller.projectTypeController.getAll);

module.exports = router;
