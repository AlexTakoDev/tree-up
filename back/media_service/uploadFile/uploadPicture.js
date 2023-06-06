const multer = require('multer');

const avatarUpload = multer({
    storage: multer.diskStorage(
        {
            destination : (req, file, cb) => {
                cb(null, 'resources/pictures/userAvatars');
            },
            filename : (req, file, cb) => {
                console.log(file)
                const name = file.originalname.split('.');
                cb(
                    null,
                    `${req.params.username}_${Date.now().toString()}_avatar.${name.at(-1)}`
                )
            }
        }
    )
})

module.exports = {
    avatarUpload
};