const ModelType = require('../model/typeProjectModel');

const getByUuid = async (uuid) => {
    console.log("test");
    const type = await ModelType.findOne({ uuid });
    if (type && type.error) throw new Error("Le type de projet n'a pas été trouvé");
    return type;
};

const getAll = async () => {
    const types = await ModelType.find().select({ _id: 0, __v: 0 });
    if (types && types.error) throw new Error("Aucun type de projet trouvé");
    return types;
};

module.exports = {
    getByUuid,
    getAll,
};