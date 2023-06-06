const axios = require('axios');
require('dotenv').config();

const getTechnoProjectUuid = async (req, res) => {
 console.log('entra la peticion', req.params.uuid)
 try {
     const { uuid } = req.params;
     // console.log('user id: ',userId);
     const response = await axios.get(
         `${process.env.MEDIA_SERVICE_ADDRESS}/api/techno_project/${uuid}`
     );
     const technos_project = response.data;
     return res.status(200).json({ technos_project });
 } catch (error) {
     if (error.response) {
         const { status, data } = error.response;
         return res.status(status).json({ message: data.message });
     }
     return res.status(500).json({ message: error.message });
 }
};

const postTechno_project = async (req, res) => {
 const { techno_uuids, project_uuid } = req.body;

 console.log('entre la req', techno_uuids, project_uuid);
 try {
  const response = await axios.post(
   process.env.MEDIA_SERVICE_ADDRESS + "/api/techno_project/", { ...req.body});
 
 res.status(201).json({ message: 'creacion de tecnologias a proyecto' });
} catch (error) {
 return res.status(error.response ? error.response.status : 500).json({ error });
};
}



module.exports = {
 getTechnoProjectUuid,
 postTechno_project,
}