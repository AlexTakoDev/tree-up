const service = require('../service/likeService');

const postLikeController = async (req, res) => {
    try {
        const like = await service.postLike(req.body);
        res.status(200).json(like)
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getProjectLikeByUserController = async (req, res) => {
    try {
        const islike = await service.getProjectLikeByUser(req.body);
        res.status(200).json(islike)
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getLikesByProjectController = async (req, res) => {
    try {
        const likecount = await service.getLikesByProject(req.body);
        res.status(200).json(likecount)
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    postLikeController,
    getProjectLikeByUserController,
    getLikesByProjectController,
}