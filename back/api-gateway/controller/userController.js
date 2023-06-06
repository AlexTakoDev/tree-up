const axios = require("axios");
require("dotenv").config();
const FormData = require('form-data');

// controller appellé par la route
const userControllerSignin = async (req, res) => {
    try {
        // appel axios à la route du microservice
        const response = await axios.post(
            `${process.env.USER_SERVICE_ADDRESS}/api/signin`,
            {
                email: req.body.email,
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                username: req.body.username,
                password: req.body.password,
                role: "user",
            }
        );
        const { message } = response.data;
        return res.status(200).json({ message: message });
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json({ message: data.message });
        }
        return res.status(500).json({ message: error.message });
    }
};


const userControllerLogin = async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.USER_SERVICE_ADDRESS}/api/login`,
            {
                email: req.body.email,
                password: req.body.password,
            }
        );
        const { token, avatar } = response.data; 
        return res.status(200).send({ token: token, avatar : avatar });
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json({ message: data.message });
        }
        return res.status(500).json({ message: error.message });
    }
};


const getAllUsers = async (req, res) => {
    // console.log('req', req.auth)
    try {
        const response = await axios.get(
            `${process.env.USER_SERVICE_ADDRESS}/api/users`
        );
        // console.log('data', response.data)
        const users = response.data.users;
        return res.status(200).json({ users });
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json({ message: data.message });
        }
        return res.status(500).json({ message: error.message });
    }
};


const getAllProfileUsers = async (req, res) => {
    // console.log('req', req.auth)
    try {
        const response = await axios.get(
            `${process.env.USER_SERVICE_ADDRESS}/api/profiles`
        );
        // console.log('data', response.data)
        const profileUsers = response.data.profileUsers;
        return res.status(200).json({ profileUsers });
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json({ message: data.message });
        }
        return res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    // console.log('entra la peticion', req.params.userId)
    try {
        const { uuid } = req.params;
        // console.log('user id: ',userId);
        const response = await axios.get(
            `${process.env.USER_SERVICE_ADDRESS}/api/users/${uuid}`
        );
        const user = response.data.user;
        return res.status(200).json({ user });
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json({ message: data.message });
        }
        return res.status(500).json({ message: error.message });
    }
};



const postExperience = async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.USER_SERVICE_ADDRESS}/api/postoneexperience`,
            {
                experience: req.body,
                user: req.auth
            });
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
    }
}

const updateExperience = async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.USER_SERVICE_ADDRESS}/api/updateoneexperience`,
            {
                experience: req.body,
                user: req.auth
            });
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
    }
}

const deleteExperience = async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.USER_SERVICE_ADDRESS}/api/deleteoneexperience`,
            {
                uuid_experience: req.body.uuid,
                user: req.auth
            });
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
    }
}

const postSoft_skill = async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.USER_SERVICE_ADDRESS}/api/postonesoft_skill`,
            {
                soft_skill: req.body,
                user: req.auth
            });
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
    }
}

const updateSoft_skill = async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.USER_SERVICE_ADDRESS}/api/updateonesoft_skill`,
            {
                soft_skill: req.body,
                user: req.auth
            });
        console.log(response);
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
    }
}

const deleteSoft_skill = async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.USER_SERVICE_ADDRESS}/api/deleteonesoft_skill`,
            {
                uuid_soft_skill: req.body.uuid,
                user: req.auth
            });
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
    }
}

const getProfileUserEdit = async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.USER_SERVICE_ADDRESS}/api/userprofile/${req.auth.user.uuid}`);
        try {
            const avatar = await axios.get(
                `${process.env.MEDIA_SERVICE_ADDRESS}/api/getavatar/${req.auth.user.uuid}/`,
                {
                    responseType: 'arraybuffer'
                }
            );
            if(Buffer.from(avatar.data).byteLength !== 0 ) {
                const avatarOBJ = {
                  data: Buffer.from(avatar.data, 'binary').toString('base64'),
                  contentType: avatar.headers['content-type']
              }
            return res.status(avatar.status).json({ user: response.data, avatar: avatarOBJ })
            } else {
                return res.status(avatar.status).json({ user: response.data, avatar: null })
            }
        } catch (error) {
            console.log(error)
        }
        return res.status(200).json({ user: response.data, avatar: null });
    } catch (error) {
        console.log(error.response);
        return res.status(500).json({ message: error.response.data });
    }
}

const getProfileUser = async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.USER_SERVICE_ADDRESS}/api/userprofile/${req.params.uuid}`);
        try {
            const avatar = await axios.get(
                `${process.env.MEDIA_SERVICE_ADDRESS}/api/getavatar/${req.params.uuid}/`,
                {
                    responseType: 'arraybuffer'
                }
            );
            if(Buffer.from(avatar.data).byteLength !== 0 ) {
                const avatarOBJ = {
                  data: Buffer.from(avatar.data, 'binary').toString('base64'),
                  contentType: avatar.headers['content-type']
              }
            return res.status(avatar.status).json({ user: response.data, avatar: avatarOBJ })
            } else {
                return res.status(avatar.status).json({ user: response.data, avatar: null })
            }
        } catch (error) {
            console.log(error)
        }
        return res.status(200).json({ user: response.data, avatar: null });
    } catch (error) {
        console.log(error.response);
        return res.status(500).json({ message: error.response.data });
    }
}

const update_profile = async (req, res) => {
    try {
        const response = await axios.put(
            `${process.env.USER_SERVICE_ADDRESS}/api/updateuser/${req.auth.user.uuid}`,
            {
                ...req.body,
                user: req.auth.user.uuid,
            });
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: error.response.data });
    }
}

module.exports = {
    userControllerSignin,
    userControllerLogin,
    getAllUsers,
    getAllProfileUsers,
    postExperience,
    postSoft_skill,
    updateExperience,
    updateSoft_skill,
    getProfileUser,
    getProfileUserEdit,
    deleteExperience,
    deleteSoft_skill,
    getUser,
    update_profile
};
