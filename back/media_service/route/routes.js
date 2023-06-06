const express = require('express');
const router = express.Router();
require('dotenv').config();
const controller = require('../controller/controler');
const pictureUpload = require('../uploadFile/uploadPicture');

router.post('/postavatar/image/:uuid/:username', pictureUpload.avatarUpload.single('image'), controller.avatar.postAvatarController);
router.get('/getavatar/:uuid', controller.avatar.getAvatarController);
router.get('/deleteavatar/:uuid', controller.avatar.deleteAvatarController);

router.get('/techno/:uuid', controller.techno.getTechno);

router.get('/techno', controller.techno.getAllTechno);

router.post('/techno/add' , controller.techno.postAddtechno);

router.put('/techno/put/:uuid' , controller.techno.putTechno);

router.delete('/techno/delete', controller.techno.deleteTechno_Controller);


// uuiproject et technos

router.post('/techno_project', controller.techno_project.postTechno_project);

router.get('/techno_project/:uuid', controller.techno_project.getTechno_project);

router.delete('/deleteTechno_project', controller.techno_project.deleteTechno_projectController);

module.exports = router;