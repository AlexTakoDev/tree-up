const service = require('../service/services');

const create = async (req, res) => {
    try {
        const newProject = await service.project.create(req.body);
        if (newProject.error) throw newProject.error;
    } catch (error) {
        return res.status(400).json(error)
    }
    return res.status(201).json({ success: project });
}

module.exports = {
    create,
}