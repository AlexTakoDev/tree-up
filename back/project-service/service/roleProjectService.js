const roleProjectModel = require("../model/roleProjectModel");
const { v4: uuidv4 } = require("uuid");
const { checkPreferences } = require("joi");

const create = async ({ uuid_project, uuid_user, owner, collaborator }) => {
  const newRoleProject = new roleProjectModel({
    uuid: uuidv4(),
    uuid_project,
    uuid_user,
    owner,
    collaborator,
  });

  try {
    const roleProject = await newRoleProject.save();
    return { success: roleProject };
  } catch (error) {
    return { error };
  }
};

const isOwner = async (uuid_user, uuid_project) => {
  try {
    const owner = await roleProjectModel.findOne({
      uuid_project: uuid_project,
      uuid_user: uuid_user,
      owner: true,
    });
    return { success: !!owner };
  } catch (error) {
    return { error };
  }
};

const getByUser = async (uuid_user) => {
  try {
    let roleProject = await roleProjectModel
      .find({ uuid_user })
      .select({ uuid_project: 1, _id: 0 });
    roleProject = roleProject.map((rP) => rP.uuid_project);
    if (roleProject == null) throw new Error("Membre de projet non trouver");
    return { success: roleProject };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  create,
  isOwner,
  getByUser,
};
