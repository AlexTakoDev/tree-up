const User = require('../model/userModel');
const UserProfile = require('../model/userProfileModel');
const { v4: uuidv4 } = require('uuid');

const postOneSoft_skill = async (data) => {
    const {soft_skill, user} = data;

    const userData = await User.findOne({uuid : user.user.uuid}).populate('profile');
    if(userData) {
        const userProfile = userData.profile;
        if(userProfile){
            soft_skill.uuid = uuidv4();
            userProfile.soft_skill.push(soft_skill);
            await userProfile.save(function (err,doc){
                if(err){
                    return err
                }
            });
            return soft_skill;
        } else {
            return {"error":"can't find profile of specified user"};
        }
    } else {
        return {"error":"can't find specified user"};
    }
    
}

const updateOneSoft_skill = async (data) => {
    const {soft_skill, user} = data;
    const userData = await User.findOne({uuid : user.user.uuid}).populate('profile');
    if( userData){
        const userProfile = userData.profile;
        if(userProfile){
            console.log(soft_skill)
            const found = userProfile.soft_skill.findIndex(e => e.uuid === soft_skill.uuid);
            if(found >=0){
                userProfile.soft_skill[found] = soft_skill;
                await userProfile.save(function (err,doc){
                    if(err){
                        return err
                    }
                });
            } else {
                return {"error":"can't find specified soft_skill in user_profil of specified user"};
            }
            return soft_skill;
        } else {
            return {"error":"can't find profile of specified user"};
        }
    } else {
        return {"error":"can't find specified user"};
    }
}

const deletteOneSoft_skill = async (data) => {
    const { user, uuid_soft_skill } = data;
    const userData = await User.findOne({uuid : user.user.uuid}).populate('profile');
    if( userData) {
        const userProfile = userData.profile;
        if(userProfile){
            const found = userProfile.soft_skill.findIndex(e => e.uuid === uuid_soft_skill);
            if(found >=0){
                userProfile.soft_skill.pull({uuid : uuid_soft_skill});
                await userProfile.save(function (err,doc){
                    if(err){
                        return err
                    }
                });
            } else {
                return {"error":"can't find specified soft_skill in user_profil of specified user"};
            }
        return uuid_soft_skill;
        } else {
            return {"error":"can't find profile of specified user"};
        }
    } else {
        return {"error":"can't find specified user"};
    }
}

module.exports = {
    postOneSoft_skill,
    updateOneSoft_skill,
    deletteOneSoft_skill
}