const express = require('express');
const router = express.Router();
const typeController = require('../controller/typesController');

router.get('/', typeController.getAll);

module.exports = router;