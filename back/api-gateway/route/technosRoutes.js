const express = require('express');
const router = express.Router();
require('dotenv').config()
const auth = require('../middleware/auth');
const DTO = require('../dto/dtos')
const Controller = require("../controller/controllers");

router.get("/techno/:uuid", Controller.technoController.getTechnoUuid );
router.get("/techno", Controller.technoController.getTechnosAll );
router.get("/techno_project/:uuid", Controller.technoProjectController.getTechnoProjectUuid );
router.delete("/project/:project_uuid/collaborator/:collaborator_uuid",Controller.collaboratorsController.deleteCollaborator );
router.post('/techno_project', Controller.technoProjectController.postTechno_project );

module.exports = router;