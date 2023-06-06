const axios = require('axios');
require('dotenv').config();

const create = async (req, res) => {
    //  console.log(req.body)
    try {
        const response = await axios.post(process.env.PROJECT_SERVICE_ADDRESS + "/collaborators/add", { ...req.body, user: req.auth });
        return res.status(response.status).send(response.data.success);
    } catch (error) {
        return res.status(error.response ? error.response.status : 500).json({ error });
    }
};


const showcollaborators = async (req, res) => {
    try {
        const projectId = req.params.uuid_project;
        // console.log('user id: ',userId);
        const response = await axios.get(`http://localhost:8020/collaborators/project/${projectId}`);
        const idUsers = response.data.success;
        return res.status(200).json( idUsers );
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteCollaborator = async (req, res) => {
    try {
      const { project_uuid, collaborator_uuid } = req.params;
      const response = await axios.delete(`http://localhost:8020/collaborators/project/${project_uuid}/collaborator/${collaborator_uuid}`);
        const msn = response.data.success;
        return res.status(200).json( msn );
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const response = await axios.post(process.env.PROJECT_SERVICE_ADDRESS + "/collaborators/update", {...req.body, user: req.auth });
        return res.status(response.status).send(response.data.success);
    } catch (error) {
        return res.status(error.response ? error.response.status : 500).json({ error });
    }
};

module.exports = {
    create,
    showcollaborators,
    deleteCollaborator,
    update,
}