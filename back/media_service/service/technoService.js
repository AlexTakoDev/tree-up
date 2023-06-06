const pool = require('../poolDB');
const Techno = require('../model/technoModel.js');

const getTechno = async (uuid) => {
 const query = `SELECT * FROM public.techno WHERE technologie_uuid='${uuid}'`;
 const result = await pool.query(query);
 return result.rows[0];
};

const getAllTechno = async () => {
console.log('entra la pregunta a servicio');
 const query = `SELECT * FROM public.techno`;
 const result = await pool.query(query);
 return result.rows;
};

const addTechno = async (techno) => {
 const query = `
   INSERT INTO public.techno ( name, link, picture, descripcion)
   VALUES ($1, $2, $3, $4)
 `;
 const values = [ techno.getName(), techno.getLink(), techno.getPicture(), techno.getDescription()];
 await pool.query(query, values);
};

const updateTechno = async (techno) => {
const query = `
  UPDATE public.techno
  SET name = $2, link = $3, picture = $4, descripcion = $5
  WHERE technologie_uuid = $1
`;
const values = [techno.getUuid(), techno.getName(), techno.getLink(), techno.getPicture(), techno.getDescription()];
await pool.query(query, values);
};

const deleteTechno = async (techno_uuid) => {
  try {
    const query = `DELETE FROM public.techno WHERE technologie_uuid = '${techno_uuid}';`;
    const result = await pool.query(query);
    console.log("ok");
  } catch (error) {
    console.error("Error al eliminar la tecnología:", error);
  }
};

 module.exports = {
  getTechno,
  getAllTechno,
  addTechno,
  updateTechno,
  deleteTechno,
};