const express = require('express');
const router = express.Router();

const DTO = require('../dto/dtos');
const Controller = require("../controller/controller");



router.post('/create', DTO.project.create, Controller.project.create);

router.put('/update/:uuid', DTO.project.update, Controller.project.update);

router.post('/', Controller.project.getAll);
router.get('/:uuid', DTO.project.get, Controller.project.get);
router.get('/user/:uuid', DTO.project.get, Controller.project.getByUser)
router.post("/:uuid", DTO.project.remove , Controller.project.remove);

module.exports = router;