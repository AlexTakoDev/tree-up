const express = require('express');
const router = express.Router();
require('dotenv').config()
const auth = require('../middleware/auth');
const DTO = require('../dto/dtos')
const Controller = require("../controller/controllers");

router.post("/add", DTO.collaborators.create, Controller.collaboratorsController.create);
router.get("/project/:uuid_project", Controller.collaboratorsController.showcollaborators );
router.delete("/project/:project_uuid/collaborator/:collaborator_uuid",Controller.collaboratorsController.deleteCollaborator )
router.post("/update", Controller.collaboratorsController.update);

module.exports = router;