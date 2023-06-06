const techno_project_Service = require('../service/project_service');
const Joi = require('joi');
const ComporterModel = require('../model/comporterModel.js');


const postTechno_project1 = async (req, res) => {

 const { techno_uuid, proyect_uuid } = req.body;

 console.log ('entre la req', techno_uuid, proyect_uuid);


 try {

  const schema = Joi.object({
   techno_uuid: Joi.string().required(),
   proyect_uuid: Joi.string().required(),

  });

  await schema.validateAsync({ techno_uuid, proyect_uuid });

  const techno_project = new ComporterModel(techno_uuid, proyect_uuid);

  await techno_project_Service.addTechno_project(techno_project)

  res.status(201).json({ message: 'creacion de tegnologia a proyecto' });

 } catch (error) {
  console.log(error);
  res.status(500).json({ result: 'error post' });
 }

};

const postTechno_project = async (req, res) => {
  const { techno_uuids, project_uuid } = req.body;

  console.log('entre la req', techno_uuids, project_uuid);

  try {
    const schema = Joi.object({
      techno_uuids: Joi.array().items(Joi.string().required()).required(),
      project_uuid: Joi.string().required(),
    });

    await schema.validateAsync({ techno_uuids, project_uuid });

    for (const techno_uuid of techno_uuids) {
      const techno_project = new ComporterModel(techno_uuid, project_uuid);

      await techno_project_Service.addTechno_project(techno_project);
    }

    res.status(201).json({ message: 'creacion de tecnologias a proyecto' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: 'error post' });
  }
};


const getTechno_project = async (req, res) => {
 try {
     const techno_project = await techno_project_Service.getTechno_project(req.params.uuid);
     res.status(200).json(techno_project);
 } catch (error) {
     console.log(error)
     res.status(500).json({result: "error"})
 }
};

const deleteTechno_projectController = async (req, res) => {
 const { proyect_uuid, techno_uuid } = req.body;
 console.log('Entre la req', techno_uuid, proyect_uuid);
 try {
   const schema = Joi.object({
     proyect_uuid: Joi.string().required(),
     techno_uuid: Joi.string().required(),
   });

   await schema.validateAsync({ proyect_uuid, techno_uuid });

   await techno_project_Service.deleteTechno_project(proyect_uuid, techno_uuid);

   res.status(204).end(); 
 } catch (error) {
   console.error(error); 
   res.status(500).json({ result: 'error' });
 }
};


module.exports = {
 postTechno_project,
 getTechno_project,
 deleteTechno_projectController,
};