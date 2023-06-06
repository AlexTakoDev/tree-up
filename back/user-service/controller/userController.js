const service = require('../service/services');
const axios = require('axios')

const signinController = async (req, res, next) => {
  try {
    // Vérification de l'unicité de l'email
    const user = await service.user.getUserByEmail(req.body.email);
    if (user) {
      return res.status(400).json({
        message:
          "Cette adresse e-mail est déjà enregistrée, merci de modifier votre saisie",
      });
    }
    const userByUsername = await service.user.getUserByUsername(
      req.body.username
    );
    if (userByUsername) {
      return res.status(400).json({
        message:
          "Ce nom d'utilisateur existe déjà, merci de modifier votre saisie",
      });
    }
    const result = await service.user.createUser(req.body);
    res.status(201).json({ message: result.message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await service.user.login(email, password);
    try {
      const avatar = await axios.get(
          `${process.env.MEDIA_SERVICE_ADDRESS}/api/getavatar/${response.uuid}/`,
          {
              responseType: 'arraybuffer'
          }
      );
      if(Buffer.from(avatar.data).byteLength !== 0 ) {
        const avatarOBJ = {
          data: Buffer.from(avatar.data, 'binary').toString('base64'),
          contentType: avatar.headers['content-type']
      }
      return res.send({ token: response.token, avatar: avatarOBJ });
      } else {
        return res.send({ token: response.token, avatar: null });
      }
      
  } catch (error) {
      console.log(error)
  }
  return res.send({ token: response.token, avatar: null });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await service.user.getAllUsers();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProfileUsersController = async (req, res) => {
  try {
    const profileUsers = await service.user.getAllProfileUsers();
    res.status(200).json({ profileUsers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserController = async (req, res) => {
  // console.log('entra la peticion :', req.params.userId)
  try {
    const { uuid } = req.params;
    // console.log(uuid);
    const user = await service.user.getUser(uuid);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllProfileUsersController,
  getUserController,
  signinController,
  loginController,
  getAllUsersController,
};


