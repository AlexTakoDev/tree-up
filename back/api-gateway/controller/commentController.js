const axios = require("axios");

const commentPost = async (req, res) => {
  // console.log("commentPost body", req.body);
  // console.log("commentPost auth", req.auth);
  try {
    const response = await axios.post(
      `${process.env.PROJECT_SERVICE_ADDRESS}/comments/post`,
      {
        comment: req.body.comment,
        uuid_user: req.auth.user.uuid,
        uuid_project: req.body.uuid_project,
      }
    );
    // console.log('data', response.data)
    const { success } = response.data;
    return res.status(201).json(success);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllComments = async (req, res) => {
  // console.log(req.body)
  try {
    const response = await axios.get(
      `${process.env.PROJECT_SERVICE_ADDRESS}/comments`
    );
    // console.log("data getAllComments", response.data);
    const { success } = response.data;
    return res.status(200).json(success);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCommentByProjectId = async (req, res) => {
  // console.log(req.params);
  try {
    const response = await axios.get(
      `${process.env.PROJECT_SERVICE_ADDRESS}/comments/comment/${req.params.uuid}`
    );
    // console.log("data getAllCommentsById", response.data);
    const { success } = response.data;
    return res.status(200).json(success);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  // console.log("body", req.body);
  // console.log("auth", req.auth);
  try {
    const response = await axios.put(
      `${process.env.PROJECT_SERVICE_ADDRESS}/comments/comment`,
      {
        ...req.body,
        uuid_user: req.auth.user.uuid,
      }
    );
    // console.log('data', response.data)
    const { success } = response.data;
    return res.status(200).json(success);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  // console.log("deleteComment auth", req.auth);
  // console.log("params", req.params);
  try {
    const response = await axios.delete(
      `${process.env.PROJECT_SERVICE_ADDRESS}/comments/comment/${req.params.uuid}`,
      {
        data: {
          uuid_user: req.auth.user.uuid,
        },
      }
    );
    const { message } = response.data;
    return res.status(200).json({ message });
  } catch (error) {
    const { message } = error.response.data;
    const { status } = error.response;
    return res.status(status).json({ message });
  }
};

module.exports = {
  commentPost,
  getAllComments,
  updateComment,
  getCommentByProjectId,
  deleteComment,
};
