const project = require("./projectService");
const roleProject = require("./roleProjectService");
const comment = require("./commentService");
const collaborators = require("./collaboratorsService");
const type = require("./typeService");

module.exports = {
    project,
    roleProject,
    comment,
    collaborators,
    type,
};