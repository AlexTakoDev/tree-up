const test = require('./testDTO/testDTO');
const testPost = require('./testDTO/testPostDTO');
const testProfile = require('./testDTO/testPostProfileDTO');

const postOneExperience = require('./experienceDTO/postOneExperienceDTO');
const updateOneExperience = require('./experienceDTO/updateOneExperienceDTO');
const deleteOneExperience = require('./experienceDTO/deleteOneExperienceDTO');

const postOneSoft_skill = require('./soft_skillDTO/postOneSoft_skillDTO');
const updateOneSoft_skill = require('./soft_skillDTO/updateOneSoft_skillDTO');
const deletteOneSoft_skill = require('./soft_skillDTO/deleteOneSoft_skillDTO')

const updateProfile = require('./profileDTO/updateProfileDTO');

const loginDTO = require('./userDTO/loginDTO');
const signinDTO = require('./userDTO/signinDTO')

module.exports = {
    test,
    testPost,
    testProfile,
    postOneExperience,
    updateOneExperience,
    deleteOneExperience,
    postOneSoft_skill,
    updateOneSoft_skill,
    deletteOneSoft_skill,
    updateProfile,
    loginDTO,
    signinDTO
}
