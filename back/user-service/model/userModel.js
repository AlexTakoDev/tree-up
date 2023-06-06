const mongoose = require("mongoose");

//schéma de la data des collections 
const userSchema = mongoose.Schema({
    id: Number,
    uuid: String,
    email: { type: String, unique: true },
    password: String,
    // date_create: { type: Date },
    firstname: String,
    lastname: String,
    username: String,
    avatar: String,
    private: Boolean,
    role: String,
    // role: {
    //     admin: Boolean,
    //     user_role: Boolean
    // },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "user_profile" },
  },
  {
    timestamps: true,
  }
);
//nom de la collection  = nom du model+s exepemple nom du model : user, nom de la collections : users
module.exports = mongoose.model("user", userSchema);
