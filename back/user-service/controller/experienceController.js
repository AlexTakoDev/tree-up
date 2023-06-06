const service = require('../service/services');

const postOneExperienceController = async (req, res) => {
    try {
        return res.status(200).json({ result: await service.experience.postOneExperience(req.body) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const updateOneExperienceController = async (req, res) => {
    try {
        return res.status(200).json({ result: await service.experience.updateOneExperience(req.body) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const deleteOneExperienceController = async (req, res) => {
    try {
        return res.status(200).json({ result: await service.experience.deletteOneExperience(req.body) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    postOneExperienceController,
    updateOneExperienceController,
    deleteOneExperienceController
}