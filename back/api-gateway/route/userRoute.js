const express = require("express");
const router = express.Router();
require("dotenv").config();
const DTO = require("../dto/dtos");
const { userController } = require("../controller/controllers");
const auth = require("../middleware/auth");

// url route microservice user
const TREE_UP = process.env.API_ADDRESS + "/newuser";
const LOGIN = process.env.API_ADDRESS + "/login";
const USERS = process.env.API_ADDRESS + "/users";
const USER = process.env.API_ADDRESS+"/user/:userId";

const PROFILES = process.env.API_ADDRESS + "/profiles";
const PROFILE = process.env.API_ADDRESS+"/getprofile/:uuid";
const PROFILEEDIT = process.env.API_ADDRESS+"/getprofileedit";
const UPDATEPROFILE = process.env.API_ADDRESS+"/updateuser"

const NEWEXPERIENCE = process.env.API_ADDRESS+"/newexperience";
const UPDATEEXPERIENCE = process.env.API_ADDRESS+"/updateexperience";
const DELETEEXPERIENCE = process.env.API_ADDRESS+"/deleteexperience";

const NEWSOFTSKILL = process.env.API_ADDRESS+"/newsoftskill";
const UPDATESOFTSKILL = process.env.API_ADDRESS+"/updatesoftskill"
const DELETESOFTSKILL = process.env.API_ADDRESS+"/deletesoftskill"

// route : url , dto , controller
router.post(TREE_UP, userController.userControllerSignin);

router.post(LOGIN, userController.userControllerLogin);

router.get(USERS, auth, userController.getAllUsers);

router.get(PROFILES, auth, userController.getAllProfileUsers);

router.get(USERS + "/:uuid", userController.getUser);

router.post(NEWEXPERIENCE, auth, DTO.userNewExperience, userController.postExperience);

router.post(UPDATEEXPERIENCE, auth, DTO.userUpdateExperience, userController.updateExperience);

router.post(DELETEEXPERIENCE, auth, DTO.userDeleteExperience, userController.deleteExperience);

router.post(NEWSOFTSKILL, auth, DTO.userNewSoft_skill, userController.postSoft_skill);

router.post(UPDATESOFTSKILL, auth, DTO.userUpdateSoft_skill, userController.updateSoft_skill);

router.post(DELETESOFTSKILL, auth, DTO.userDeleteSoft_skill, userController.deleteSoft_skill);

router.get(PROFILE, userController.getProfileUser);

router.get(PROFILEEDIT, auth, userController.getProfileUserEdit);

router.put(UPDATEPROFILE,auth, DTO.userUpdate, userController.update_profile);

router.get(USER,auth , userController.getUser);

router.get(USERS + "/:uuid", auth, userController.getUser);


module.exports = router;
