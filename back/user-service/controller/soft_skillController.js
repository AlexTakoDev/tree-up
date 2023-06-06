const service = require('../service/services');

const postOneSoft_skillController = async (req, res) => {
    try {
        return res.status(200).json({ result: await service.soft_skill.postOneSoft_skill(req.body) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const updateOneSoft_skillController = async (req, res) => {
    try {
        return res.status(200).json({ result: await service.soft_skill.updateOneSoft_skill(req.body) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const deleteOneSoft_skillController = async (req, res) => {
    try {
        return res.status(200).json({ result: await service.soft_skill.deletteOneSoft_skill(req.body) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    postOneSoft_skillController,
    updateOneSoft_skillController,
    deleteOneSoft_skillController
}