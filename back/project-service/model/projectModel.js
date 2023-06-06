const mongoose = require("mongoose");

//schema de la data des collections
const projectSchema = mongoose.Schema({
    uuid: String,
    name: String,
    date_start: { type: Date },
    date_end: { type: Date },
    description: String,
    type : { type: mongoose.Schema.Types.ObjectId, ref: 'type' }
},{
    timestamps: true
});

//nom de la collection  = nom du model+s exemple nom du model : project, nom de la collections : projects
module.exports = mongoose.model("project", projectSchema);
