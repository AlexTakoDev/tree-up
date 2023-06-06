const pool = require('../poolDB');


const addTechno_project = async (techno_project) => {
  
  const query = `
    INSERT INTO public.comporte (techno_uuid, proyect_uuid)
    VALUES ($1, $2)
  `;
  const values = [techno_project.gettechno_uuid(), techno_project.getproyect_uuid()];
  await pool.query(query, values);
};

// const getTechno_project = async (uuid) => {
//  const query = `SELECT * FROM public.comporte WHERE proyect_uuid='${uuid}'`;
//  const result = await pool.query(query);
//  return result.rows;
// };
const getTechno_project = async (uuid) => {
  const query = `SELECT c.proyect_uuid, t.technologie_uuid, t.name, t.descripcion, t.link, t.picture
  FROM public.comporte c
  JOIN public.techno t ON c.techno_uuid = t.technologie_uuid
  WHERE c.proyect_uuid ='${uuid}'`;
  const result = await pool.query(query);
  return result.rows; // Retornar todas las filas en el resultado
};

const deleteTechno_project = async (project_uuid, techno_uuid) => {
  try {
    const query = `DELETE FROM public.comporte WHERE proyect_uuid = $1 AND techno_uuid = $2;`;
    const result = await pool.query(query, [project_uuid, techno_uuid]);
    console.log("ok");
  } catch (error) {
    console.error("Error al eliminar la fila:", error);
  }
};

module.exports = {
  addTechno_project,
  getTechno_project,
  deleteTechno_project,
};