
const path = require('node:path');
const technoService = require('../service/technoService');
const Techno = require('../model/technoModel');
const Techno1 = require('../model/tecnhoModel1');
const Joi = require('joi');



const getTechno = async (req, res) => {
    try {
        const techno = await technoService.getTechno(req.params.uuid);
        res.status(200).json(techno);
    } catch (error) {
        console.log(error)
        res.status(500).json({result: "error"})
    }
};

const getAllTechno = async (req, res) => {
 console.log("entra la pregunta a controller")
    try {
        const allTechno = await technoService.getAllTechno();
        res.status(200).json(allTechno);
    } catch (error) {
        console.log(error)
        res.status(500).json({result: "error"})
    }
};

const postAddtechno = async (req, res) => {
 const { name, link, picture, description } = req.body;

 try {
   const schema = Joi.object({
     name: Joi.string().required(),
     link: Joi.string().uri().required(),
     picture: Joi.string().required(),
     description: Joi.string().required(),
   });

   await schema.validateAsync({ name, link, picture, description });

   const techno = new Techno1(name, link, picture, description);
   await technoService.addTechno(techno);

   res.status(201).json({ message: 'Tecnología creada exitosamente' });
 } catch (error) {
   console.log(error);
   res.status(500).json({ result: 'error post' });
 }
};


const putTechno = async (req, res) => {
 const uuid = req.params.uuid;
 const name = req.body.name;
 const link = req.body.link;
 const picture = req.body.picture;
 const description = req.body.description;
 

 try {
  const schema = Joi.object({
   name: Joi.string(),
   link: Joi.string().uri(),
   picture: Joi.string(),
   description: Joi.string(),
 }).min(1); 
 
 const { error } = schema.validate(req.body);
 if (error) {
   return res.status(400).json({ message: error.details[0].message });
 }
  
   const techno = new Techno(uuid, name, link, picture, description);
   await technoService.updateTechno(techno);
   res.status(200).send('Tecnología actualizada exitosamente');
 } catch (error) {
   console.log(error);
   res.status(500).send('Ocurrió un error al actualizar la tecnología');
 }
};

const deleteTechno_Controller = async (req, res) => {
  const { techno_uuid } = req.body;

  try {
   
 
    await  technoService.deleteTechno(techno_uuid);
 
    res.status(204).end(); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ result: 'error' });
  }
 };


module.exports = {
    getTechno,
    getAllTechno,
    postAddtechno,
    putTechno,
   deleteTechno_Controller,
};