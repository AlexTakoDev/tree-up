const mongoose = require("mongoose");

const roleProjectSchema = mongoose.Schema({
    uuid_project: String,
    uuid_user: String,
    owner: Boolean,
    collaborator: Boolean,
});

module.exports = mongoose.model("role_project", roleProjectSchema);