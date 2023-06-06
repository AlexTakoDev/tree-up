const mongoose = require("mongoose");
const schema = mongoose.Schema;

const commentSchema = schema(
  {
    uuid: String,
    comment: String,
    uuid_user: String,
    uuid_project: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
