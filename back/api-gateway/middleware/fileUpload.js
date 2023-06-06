const multer = require('multer');

const avatarUpload = multer({
    storage: multer.diskStorage(
        {
            destination : (req, file, cb) => {
                cb(null, 'ressource/fileTemp');
            },
            filename : (req, file, cb) => {
                console.log(file);
                const name = file.mimetype.split('/');
                cb(
                    null,
                    `${req.auth.user.username}_${Date.now().toString()}_avatar.${name.at(-1)}`
                )
            }
        }
    )
})

module.exports = {
    avatarUpload
};