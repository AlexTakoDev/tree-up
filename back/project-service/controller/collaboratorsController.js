const service = require('../service/services');


const create = async (req, res) => {
    // console.log('reqbody',req.body)
    try {
        const { project_uuid, collaborators } = req.body;

        // console.log('controller in', project_uuid, collaborators)

        const promises = collaborators.map(async (uuid_user) => {
            const newCollaborator = await service.collaborators.create({
                uuid_project: project_uuid,
                uuid_user,
                owner: false,
                collaborator: true,
            });
            if (newCollaborator.error) throw newCollaborator.error;
            return newCollaborator.success;
        });

        const createdCollaborators = await Promise.all(promises);
        return res.status(201).json({ success: createdCollaborators });
    } catch (error) {
        res.status(400).json(error);
    }
};

const getCollaboratorsByProject = async (req, res) => {
    try {
      const { project_uuid } = req.params;
      
        //Colaborators
      const collaboratorsResult = await service.collaborators.findCollaboratorsByProject(project_uuid);
    //   console.log( 'resulColl',collaboratorsResult)
      if (collaboratorsResult.error) throw collaboratorsResult.error;
  
      const collaborators = collaboratorsResult.success.map(({ uuid_user }) => uuid_user);
    //   console.log('id col', collaborators)
        //Owners
      const ownerResult = await service.collaborators.findOwnerByProject(project_uuid);
    //   console.log('resulOrwen',ownerResult)
      if (ownerResult.error) throw ownerResult.error;
  
      const owners = ownerResult.success.map(({ uuid_user }) => uuid_user);
    //   console.log(' id de owner',owners)
  
      return res.status(200).json({ success:{ owners, collaborators }});
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  const deleteCollaborator = async (req, res) => {
    try {
      const { project_uuid, collaborator_uuid } = req.params;
  
      // Elimina el colaborador del proyecto
      const result = await service.collaborators.deleteCollaboratorFromProject(project_uuid, collaborator_uuid);
  
      if (result.error) {
        return res.status(404).json({ error: 'No se encontró el colaborador' });
      }
  
      return res.status(200).json({ success: 'Colaborador eliminado exitosamente' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
  
  const updateCollaborators = async (req, res) => {
    try {
      const { project_uuid, collaborators } = req.body;
  
      // Obtener los colaboradores existentes
      const existingCollaboratorsResult = await service.collaborators.findCollaboratorsByProject(project_uuid);
      if (existingCollaboratorsResult.error) throw existingCollaboratorsResult.error;
      const existingCollaborators = existingCollaboratorsResult.success;
  
      // Obtener los identificadores de usuario de los colaboradores existentes
      const existingCollaboratorIds = existingCollaborators.map(({ uuid_user }) => uuid_user);
  
      // Obtener los identificadores de usuario de los nuevos colaboradores
      const newCollaboratorIds = collaborators.filter((id) => !existingCollaboratorIds.includes(id));
  
      // Eliminar los colaboradores que ya no están en la nueva lista
      const deletedCollaboratorPromises = existingCollaborators
        .filter(({ uuid_user }) => !collaborators.includes(uuid_user))
        .map(async ({ uuid_user }) => {
          const deleteResult = await service.collaborators.deleteCollaboratorFromProject(project_uuid, uuid_user);
          if (deleteResult.error) throw deleteResult.error;
          return deleteResult.success;
        });
      await Promise.all(deletedCollaboratorPromises);
  
      // Agregar los nuevos colaboradores
      const newCollaboratorPromises = newCollaboratorIds.map(async (uuid_user) => {
        const newCollaborator = await service.collaborators.create({
          uuid_project: project_uuid,
          uuid_user,
          owner: false,
          collaborator: true,
        });
        if (newCollaborator.error) throw newCollaborator.error;
        return newCollaborator.success;
      });
      const createdCollaborators = await Promise.all(newCollaboratorPromises);
    
  
      // Obtener los identificadores de usuario de los colaboradores actualizados
      const updatedCollaboratorIds = [
        ...existingCollaboratorIds.filter((id) => collaborators.includes(id)),
        ...newCollaboratorIds,
      ];
  
      // Obtener los identificadores de usuario de los propietarios
      const ownerResult = await service.collaborators.findOwnerByProject(project_uuid);
      if (ownerResult.error) throw ownerResult.error;
      const owners = ownerResult.success.map(({ uuid_user }) => uuid_user);
  
      // Devolver los identificadores de usuario actualizados de los colaboradores y los propietarios
      return res.status(200).json({ success: { owners, collaborators: updatedCollaboratorIds } });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

module.exports = {
    create,
    getCollaboratorsByProject,
    deleteCollaborator,
    updateCollaborators,
};