const Services = require('../service/services');

const getAll = async (req, res) => {
    try {
        const types = await Services.type.getAll();
        res.status(200).json(types);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

module.exports = {
    getAll,
};