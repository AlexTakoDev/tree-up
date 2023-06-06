const express = require("express");
const router = express.Router();

const controller = require("../controller/controller");
const DTO = require("../dto/dtos");

router.post("/post", DTO.comment.post, controller.comment.create);

router.get("/", controller.comment.getAll);

router.put("/comment", DTO.comment.update, controller.comment.update);

router.get("/comment/:uuid", controller.comment.getByProjectId);

router.delete("/comment/:uuid", controller.comment.deleteComment);

module.exports = router;
