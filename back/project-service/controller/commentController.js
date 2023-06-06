const services = require("../service/services");

const create = async (req, res) => {
  // console.log("commentController create", req.body);

  const newComment = await services.comment.create(req.body);
  try {
    // console.log("try create commentController");
    if (newComment.error) throw newComment.error;
    // console.log("newComment", newComment);
    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAll = async (req, res) => {
  const allComments = await services.comment.getAll();
  try {
    if (allComments.error) throw allComments.error;
    return res.status(200).json(allComments);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getByProjectId = async (req, res) => {
  // console.log(req.params);

  const comments = await services.comment.getByProjectId(req.params);
  try {
    if (comments.error) throw comments.error;
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const update = async (req, res) => {
  // console.log('body controller', req.body)

  const updatedComment = await services.comment.update(req.body);
  try {
    if (updatedComment.error) throw updatedComment.error;
    return res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteComment = async (req, res, next) => {
  // console.log(req.params);
  // console.log("body", req.body);

  try {
    const uuid_user = req.body.uuid_user;
    const uuid = req.params.uuid;
    const response = await services.comment.deleteComment(uuid_user, uuid);
    return res.status(200).json(response);
  } catch (error) {
    if (
      error.message === "Comment not found" ||
      error.message === "Not authorized"
    ) {
      return res.status(403).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "an error has occurred" });
    }
  }
};

module.exports = {
  create,
  getAll,
  update,
  getByProjectId,
  deleteComment,
};
