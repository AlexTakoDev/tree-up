const express = require("express");
const router = express.Router();
require("dotenv").config();
const auth = require("../middleware/auth");
const DTO = require("../dto/dtos");
const Controller = require("../controller/controllers");


router.post("/create", auth, DTO.project.create, Controller.projectController.create);

router.put("/update/:uuid", auth, DTO.project.update, Controller.projectController.update);

router.post('/', DTO.project.getAll, Controller.projectController.getAll);
router.get("/:uuid", DTO.project.get, Controller.projectController.get);
router.get("/getprojectlogged/:uuid", DTO.project.get, auth, Controller.projectController.getProjectLogged);
router.get("/user/:uuid", DTO.project.get, Controller.projectController.getByUser);
router.delete("/:uuid", auth, DTO.project.remove, Controller.projectController.remove);

module.exports = router;
