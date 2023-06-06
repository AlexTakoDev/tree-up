const express = require('express');
const router = express.Router();

const projectRoutes = require("./projectRoutes");
const typeRoutes = require("./typeRoutes");
const commentRoutes = require("./commentRoutes");
const collaboratorsRoutes = require("./collaboratorsRoutes")

router.use("/project", projectRoutes);
router.use("/type", typeRoutes);
router.use("/comments", commentRoutes);
router.use("/collaborators", collaboratorsRoutes)
router.use("/type", typeRoutes);

module.exports = router;