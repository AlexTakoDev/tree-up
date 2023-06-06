const collaboratorsModel = require("../model/roleProjectModel");

const { v4: uuidv4 } = require('uuid');

const { default: mongoose } = require("mongoose");

const create = async ({ uuid_project, uuid_user, owner, collaborator}) => {

    // console.log('service:', uuid_project, uuid_user, owner, collaborator)
    try {
    const newRole = new collaboratorsModel({
      _id: mongoose.Types.ObjectId(),
        uuid: uuidv4(),
        uuid_project,
        uuid_user,
        owner,
        collaborator,
    });



    const project = await newRole.save();
    return { success: project };
  } catch (error) {
    console.log("Error al guardar nuevo colaborador:", error);
    return { error };
  }
};

const findCollaboratorsByProject = async (uuid_project) => {
    
  try {
    const collaborators = await collaboratorsModel.find({ uuid_project, collaborator: true });
    return { success: collaborators };
  } catch (error) {
    console.log("Error al buscar colaboradores:", error);
    return { error };
  }
};
const findOwnerByProject = async (uuid_project) => {
    
  try {
    const owners = await collaboratorsModel.find({ uuid_project, owner: true });
    return { success: owners };
  } catch (error) {
    console.log("Error al buscar owners:", error);
    return { error };
  }
};

const deleteCollaboratorFromProject = async (uuid_project, uuid_user) => {
  try {
    const collaborator = await collaboratorsModel.findOne({ uuid_project, uuid_user });
    // console.log('colaborator service',collaborator)
    if (!collaborator) {
      return { error: "No se encontró al colaborador" };
    }
    await collaborator.remove();
    return { success: "Colaborador eliminado con éxito" };
  } catch (error) {
    console.log("Error al eliminar colaborador:", error);
    return { error };
  }
};

module.exports = {
    create,
    findCollaboratorsByProject,
    findOwnerByProject,
    deleteCollaboratorFromProject,
};