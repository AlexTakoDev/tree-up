const mongoose = require("mongoose");

//schema de la data des collections
const projectSchema = mongoose.Schema({
    uuid: String,
    name: String,
});

//nom de la collection  = nom du model+s exemple nom du model : project, nom de la collections : projects
module.exports = mongoose.model("type", projectSchema);
