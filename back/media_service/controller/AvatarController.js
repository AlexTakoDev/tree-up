const service = require('../service/services')
const path = require('node:path');

const postAvatarController = async (req, res) => {
    try {
        const result = await service.avatar.postAvatar(req);
        res.status(200).json({result: "oui"})
    } catch (error) {
        res.status(200).json({result: "non"})
    }
}

const getAvatarController = async (req, res) => {
    try {
        const file = await service.avatar.getAvatar(req.params.uuid);
        if(file) {
          const dirname = path.dirname(__dirname);
        const fullPath = path.resolve(dirname,file.filepath);
        res.status(200).type(file.filetype).sendFile(fullPath)  
        } else {
            res.status(200).send(null)
        }
    } catch (error) {
        console.log(error)
        res.status(200).json(false)
    }
}

const deleteAvatarController = async (req,res) => {
    try {
        const result = await service.avatar.deleteAvatar(req.params.uuid);
        res.status(200).json(result);
    } catch (error) {
        
    }
}

module.exports = {
    postAvatarController,
    getAvatarController,
    deleteAvatarController
}