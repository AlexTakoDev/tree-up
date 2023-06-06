const axios = require('axios');
require('dotenv').config();


const getTechnosAll = async (req, res) => {
 console.log('req', req.auth)
 try {
     const response = await axios.get(
         `${process.env.MEDIA_SERVICE_ADDRESS}/api/techno`
     );
     // console.log('data', response.data)
     const technos = response.data;
     return res.status(200).json(technos);
 } catch (error) {
     if (error.response) {
         const { status, data } = error.response;
         return res.status(status).json({ message: data.message });
     }
     return res.status(500).json({ message: error.message });
 }
};

const getTechnoUuid = async (req, res) => {
 console.log('entra la peticion', req.params.uuid)
 try {
     const { uuid } = req.params;
     // console.log('user id: ',userId);
     const response = await axios.get(
         `${process.env.MEDIA_SERVICE_ADDRESS}/api/techno/${uuid}`
     );
     const techno = response.data;
     return res.status(200).json({ techno });
 } catch (error) {
     if (error.response) {
         const { status, data } = error.response;
         return res.status(status).json({ message: data.message });
     }
     return res.status(500).json({ message: error.message });
 }
};

module.exports = {
 getTechnosAll,
 getTechnoUuid,
}