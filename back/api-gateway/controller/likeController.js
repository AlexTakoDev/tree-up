const axios = require('axios');
require('dotenv').config();

const postLikeController = async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.LIKE_SERVICE_ADDRESS}/api/postlike`,
             {
                uuid_project : req.body.uuid_project,
                user: req.auth
             });
        return res.status(200).json(response.data);
    } catch (error) {
        //console.log(error)
    }
}

module.exports = {
    postLikeController,
}
