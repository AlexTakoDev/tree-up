const User = require('../model/userModel');
const UserProfile = require('../model/userProfileModel');
const { v4: uuidv4 } = require('uuid');

//function qui gere les les requette de la bdd
const getLastnameFromFirstname = async (data)=> {
    const {name} =data;
    const resultuser = []
    await User.find({firstname: name}).then(data => {
        data.forEach((user) =>{
            resultuser.push(user.lastname);
        })
    });
    return resultuser;
};

const postUserTest = async (data) => {
    //recuperation de chaque donnée (traitement qi besoin)
    const {email} = data;
    const {password} = data;
    const {username} = data;
    const {firstname} = data;
    const {lastname} = data;

    //creation d'un object d'instance model user avec les infos que l'on as besoin
    const user = new User({
        uuid : uuidv4(),
        email : email,
        password : password,
        username : username,
        firstname : firstname,
        lastname : lastname
    });
    await user.save(function (err,doc){
        console.log(doc._id);
    });
    return {"succes":'user added in the database'}
};

const postProfileTest = async (data) => {
    const {description} = data;
    const {date_birth} = data;
    const {city} = data;
    const {work} = data;
    const {experience} = data;
    const {soft_skill} = data;
    const {uuid_user} = data;

    const userProfile = new UserProfile({
        uuid : uuidv4(),
        description : description,
        date_birth : date_birth,
        city : city,
        work : work,
        experience : experience,
        soft_skill : soft_skill,
        uuid_user : uuid_user
    })
    await userProfile.save(function (err,doc){
        console.log(doc._id);
    });
    return {"succes":'user_profile added in the database'}
}

module.exports = {
    getLastnameFromFirstname,
    postUserTest,
    postProfileTest
}