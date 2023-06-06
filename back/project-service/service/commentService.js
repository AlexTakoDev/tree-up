const Comment = require("../model/commentModel");
const { v4: uuidv4 } = require("uuid");

const create = async ({ comment, uuid_user, uuid_project }) => {
  const newComment = new Comment({
    uuid: uuidv4(),
    comment,
    uuid_user,
    uuid_project,
  });
  // console.log('newComment service', newComment)
  try {
    const savedComment = await newComment.save();
    return { success: savedComment };
  } catch (error) {
    return { error };
  }
};

const getAll = async () => {
  const comments = await Comment.find();
  try {
    if (comments.error) throw error;
    return { success: comments };
  } catch (error) {
    return { error };
  }
};

const getByProjectId = async ({ uuid }) => {
  const comments = await Comment.find({ uuid_project: uuid });
  try {
    if (comments.error) throw error;
    return { success: comments };
  } catch (error) {
    return { error };
  }
};

const update = async ({ comment, uuid_user, uuid }) => {
  const findedComment = await Comment.findOne({ uuid });
  // console.log('findedComment', findedComment)
  try {
    if (!findedComment) throw error;
    if (findedComment.uuid_user !== uuid_user) throw error;
    const updatedComment = await Comment.updateOne({ uuid }, { comment });
    // console.log(updatedComment)
    if (!updatedComment) throw error;
    return { success: "Commentaire modifié" };
  } catch (error) {
    return { error };
  }
};

// const deleteComment = async ({ uuid }) => {
//   console.log("deleteService");
//   const findedComment = await Comment.findOne({ uuid });
//   try {
//     if (!findedComment) throw error;
//     // if (findedComment.uuid_user !== uuid_user) throw error
//     await Comment.deleteOne({ uuid });
//     return { success: "Commentaire supprimé" };
//   } catch (error) {
//     return { error };
//   }
// };

const deleteComment = async (uuid_user, uuid) => {
  console.log("uuid", uuid, "uuid_user", uuid_user);
  try {
    const findedComment = await Comment.findOne({ uuid });
    console.log(findedComment);
    if (!findedComment) {
      throw new Error("Comment not found");
    }
    if (findedComment.uuid_user !== uuid_user) {
      throw new Error("Not authorized");
    }
    await Comment.deleteOne({ uuid });
    return { message: "Comment deleted" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getAll,
  update,
  getByProjectId,
  deleteComment,
};
