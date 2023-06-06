const { default: axios } = require("axios");
require("dotenv").config();

const getAll = async (req, res) => {
    try {
        const response = await axios.get(
            process.env.PROJECT_SERVICE_ADDRESS + "/type/",
        );

        return res.status(response.status).send(response.data);
    } catch (error) {
        return res
            .status(error.response ? error.response.status : 500)
            .json({ message: error.response ? error.response.data : error.message });
    }
};

module.exports = {
    getAll,
};
