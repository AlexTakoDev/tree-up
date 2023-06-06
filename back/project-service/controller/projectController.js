const service = require("../service/services");
const axios = require('axios');

const checkDate = (dateStart, dateEnd) => {
  if (new Date(0) > new Date(dateStart)) {
    setError(
      "La date de creation du projet ne peut pas être antérieure à 1970."
    );
    return;
  }
  if (dateEnd && new Date(dateEnd) < new Date(dateStart)) {
    throw new Error(
      "Il est important de veiller à ce que la date de début du projet soit antérieure à la date de fin."
    );
  }
  if (Date.now() < new Date(dateStart)) {
    throw new Error(
      "Il est essentiel que la date de début du projet soit antérieure a la date d'aujourd'hui."
    );
  }
}

const create = async (req, res) => {
  try {
    const { date_start, date_end } = req.body;
    checkDate(date_start, date_end);
    const type = await service.type.getByUuid(req.body.uuid_type);
    const newProject = await service.project.create({
      ...req.body,
      uuid_user: req.body.uuid_user,
      type: type._id,
    });
    if (newProject.error) throw newProject.error;
    return res.status(201).json({ success: newProject.success });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const update = async (req, res) => {
  const uuid_project = req.params.uuid;
  const uuid_user = req.body.uuid_user;
  const data = req.body;
  try {
    const { date_start, date_end } = req.body;
    checkDate(date_start, date_end);
    data.type = await service.type.getByUuid(data.uuid_type);
    const isOwner = await service.roleProject.isOwner(uuid_user, uuid_project);
    if (isOwner.error) throw isOwner.error;
    if (isOwner.success === false)
      return res.status(401).json({ message: "Vous n'êtes pas owner du projet" });
    const result = await service.project.update(uuid_project, data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const get = async (req, res) => {
  try {
    let project = await service.project.get(req.params.uuid);
    if (project.error) throw project.error;
    try {
      const projectlikes = await axios.post(
        `${process.env.LIKE_SERVICE_ADDRESS}/api/projectlikes`,
        { uuid_project: req.params.uuid }
      ).catch((err) => {
        console.log(err)
      });
      if (!projectlikes.error) {
        
        return res.status(201).json({ success: project.success, countLikes: parseInt(projectlikes.data.count) });
      } else {
        //throw projectlikes.error
      }
    } catch (error) {
    }
    return res.status(201).json({ success: project.success });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const projects = await service.project.getAll(req.body.blacklistIds);
    if (projects.error) throw projects.error;
    return res.status(201).json({ success: projects.success });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getByUser = async (req, res) => {
  try {
    const uuid_projects = await service.roleProject.getByUser(req.params.uuid);
    if (uuid_projects.error) throw uuid_projects.error;
    const projects = await service.project.getMultiple(uuid_projects.success);
    if (projects.error) throw projects.error;
    return res.status(201).json({ success: projects.success });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const {uuid: uuid_project} = req.params;
    const {uuid_user} = req.body;
    const isOwner = await service.roleProject.isOwner(uuid_user, uuid_project);
    if (isOwner.error) throw isOwner.error;
    if (isOwner.success === false)
      return res.status(401).json({ message: "Vous n'êtes pas proprietaire du projet" });
    const result = await service.project.remove(uuid_project);
    if (result.error) throw result.error;
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  create,
  update,
  get,
  getAll,
  getByUser,
  remove,
};
