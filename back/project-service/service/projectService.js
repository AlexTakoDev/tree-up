const projectModel = require("../model/projectModel");

const { v4: uuidv4 } = require("uuid");
const roleProjectModel = require("../model/roleProjectModel");

const create = async ({
  name,
  date_start,
  date_end,
  description,
  uuid_user,
  type,
}) => {

    const newProject = new projectModel({
        uuid: uuidv4(),
        name,
        date_start,
        date_end,
        description,
        type,
    });

    const newRoleProject = new roleProjectModel({
        uuid_project: newProject.uuid,
        uuid_user,
        owner: true,
        collaborator: false,
    });
    
    try {
      await newRoleProject.save();
      const project = await newProject.save();
      return { success: project };
    } catch (error) {
      return { error };
    }
  };
  
const update = async (uuid, data) => {
  try {
    const project = await projectModel.findOne({ uuid });
    if (!project) {
      throw new Error("Project not found");
    }

    project.name = data.name || project.name;
    project.date_start = data.date_start || project.date_start;
    project.date_end = data.date_end || project.date_end;
    project.description = data.description || project.description;
    project.type = data.type || project.type;

    const roleProject = await roleProjectModel.findOne({
      uuid_project: project.uuid,
    });

    if (!roleProject) {
      throw new Error("RoleProject not found");
    }
    roleProject.owner = data.owner || roleProject.owner;
    roleProject.collaborator = data.collaborator || roleProject.collaborator;

    await project.save();
    await roleProject.save();
    return { success: project };
  } catch (error) {
    return { error };
  }
};

const get = async (uuid) => {
    try {
        const project = await projectModel
          .findOne({uuid:uuid})
          .select({ _id:0, __v:0 })
          .populate("type");
        if (project == null) throw new Error("Projet introuvable");
        return { success: project };
    } catch (error) {
        return { error };
    }
};

const getAll = async (blacklistIds) => {
  try {
      const project = await projectModel
        .find({uuid: {$nin : blacklistIds}})
        .sort({createdAt: -1})
        .limit(10)
        .select({ _id:0, __v:0 })
        .populate("type");
      if (project == null) throw new Error("Projets introuvable");
      return { success: project };
  } catch (error) {
      return { error };
  }
};

const getMultiple = async (uuid_projects) => {
  try {
      const project = await projectModel.find({ uuid: { $in: uuid_projects} }).select({ _id:0, __v:0 }).populate("type");;
      if (project == null) throw new Error("Projets introuvable");
      return { success: project };
  } catch (error) {
      return { error };
  }
};

const remove = async (uuid_projects) => {
  try {
    const project = await projectModel.findOneAndDelete({ uuid: uuid_projects });
    if (!project) throw new Error("Projet introuvable");
    return { success: project };
  } catch (error) {
    return { error };
  }
}

module.exports = {
    create,
    update,
    get,
    getAll,
    getMultiple,
    remove,
};
