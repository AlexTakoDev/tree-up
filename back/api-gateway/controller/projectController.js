const axios = require("axios");
require("dotenv").config();

const create = async (req, res) => {
  try {
    const response = await axios.post(
      process.env.PROJECT_SERVICE_ADDRESS + "/project/create",
      { ...req.body, uuid_user: req.auth.user.uuid }
    );
    return res.status(response.status).send(response.data.success);
  } catch (error) {
    return res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.response ? error.response.data : error.message });
  }
};

const update = async (req, res) => {
  try {
    const { uuid } = req.params;
    const response = await axios.put(
      process.env.PROJECT_SERVICE_ADDRESS + "/project/update/" + uuid,
      { ...req.body, uuid_user: req.auth.user.uuid }
    );
    return res.status(response.status).send(response.data.success);
  } catch (error) {
    return res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.response ? error.response.data : error.message });
  }
};

const get = async (req, res) => {
  try {
    const response = await axios.get(
      process.env.PROJECT_SERVICE_ADDRESS + "/project/" + req.params.uuid
    );
    response.data.success.countLikes = response.data.countLikes
    return res.status(response.status).send(response.data.success);
  } catch (error) {
    return res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.response ? error.response.data : error.message });
  }
};

const getProjectLogged = async (req, res) => {
  try {
    const response = await axios.get(
      process.env.PROJECT_SERVICE_ADDRESS + "/project/" + req.params.uuid
    );
    response.data.success.countLikes = response.data.countLikes
    try {
      const liked = await axios.post(
        `${process.env.LIKE_SERVICE_ADDRESS}/api/projectliked`,
        {
          user : req.auth.user,
          uuid_project : req.params.uuid
        }
      );
      response.data.success.liked = liked.data.like;
      
    } catch (error) {
      console.log(error)
    }
    return res.status(response.status).send(response.data.success);
  } catch (error) {
    return res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.response ? error.response.data : error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await axios.post(
      process.env.PROJECT_SERVICE_ADDRESS + "/project/", 
      req.body,
    );
    
    return res.status(response.status).send(response.data.success);
  } catch (error) {
    return res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.response ? error.response.data : error.message });
  }
};

const getByUser = async (req, res) => {
  try {
    const response = await axios.get(
      process.env.PROJECT_SERVICE_ADDRESS + "/project/user/" + req.params.uuid
    );
    return res.status(response.status).send(response.data.success);
  } catch (error) {
    return res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.response ? error.response.data : error.message });
  }
};

const remove = async (req, res) => {
  try {
    const response = await axios.post(
      process.env.PROJECT_SERVICE_ADDRESS + "/project/" + req.params.uuid,
      { ...req.body, uuid_user: req.auth.user.uuid }
    );
    return res.status(response.status).send(response.data.success);
  } catch (error) {
    return res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.response ? error.response.data.message : error.message });
  }
};

module.exports = {
  create,
  update,
  get,
  getProjectLogged,
  getAll,
  getByUser,
  remove,
};
