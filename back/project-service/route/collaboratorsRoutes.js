const express = require('express');
const router = express.Router();

const DTO = require('../dto/dtos');
const Controller = require("../controller/controller");

router.post('/add', DTO.collaborators.create, Controller.collaborators.create);
router.get('/project/:project_uuid', Controller.collaborators.getCollaboratorsByProject);
router.delete('/project/:project_uuid/collaborator/:collaborator_uuid', Controller.collaborators.deleteCollaborator);
router.post('/update', Controller.collaborators.updateCollaborators )

module.exports = router;