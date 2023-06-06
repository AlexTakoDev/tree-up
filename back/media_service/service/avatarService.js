const pool = require('../poolDB');
const UserAvatar = require('../model/UserAvatar');
const deleteFile = require('../uploadFile/deleteFile')

const postAvatar = async (data) => {
    const { file, params } = data;
    const userAvatar = new UserAvatar(params.uuid, file.filename, file.path, file.mimetype, file.size);
    const querySelect = `SELECT * FROM user_avatar WHERE user_uuid ='${userAvatar.getUserUUID()}'`;
    const queryInsert = `INSERT INTO user_avatar (user_uuid, filename, filepath, filetype, size) VALUES ($1, $2, $3, $4, $5) RETURNING avatar_uuid`;
    const queryUpdate = `UPDATE user_avatar SET filename ='${userAvatar.filename}' , filepath = '${userAvatar.filepath}' WHERE user_uuid = '${userAvatar.getUserUUID()}'`;
    const selectResult = await pool.query(querySelect).catch((err) => {
        console.log(err)
        return { error: err }
    });
    if (selectResult.rows.length === 0) {
        const insertResult = await pool.query(queryInsert, userAvatar.getArrayInsert()).then((res) => {
        }).catch((err) => {
            console.log(err);
            return err
        });

    } else {
        await pool.query(queryUpdate).then((res) => {
            deleteFile(selectResult.rows[0].filepath);
        }).catch((err) => {
            console.log(err)
            return { error: err }
        });
    }
}

const getAvatar = async (user_uuid) => {
    try {
        const querySelect = `SELECT * FROM user_avatar WHERE user_uuid ='${user_uuid}'`;
        const selectResult = await pool.query(querySelect).catch((err) =>{
            console.log(err)
            return {error : "can't find user avatar"}
        });
        if(selectResult.rows.length !== 0){
           return selectResult.rows[0]; 
        } else {
            return null
        }
    } catch (error) {
        console.log(error);
        return {error : "error database"}
    }

}

const deleteAvatar = async (user_uuid) => {
    try {
        const querySelect = `SELECT * FROM user_avatar WHERE user_uuid ='${user_uuid}'`;
        const queryDelete = `DELETE FROM user_avatar WHERE user_uuid ='${user_uuid}'`;
        const selectResult = await pool.query(querySelect).catch((err) =>{
            console.log(err)
            return {error : "can't find user avatar"};
        });
        if (selectResult.rows.length === 1) {
            await pool.query(queryDelete).then((res) => {
                deleteFile(selectResult.rows[0].filepath);
            }).catch((err) => {
                console.log(err)
            })
            return true
        } else {
            return {error : "user has no avatar"}
        }
    } catch (error) {
        return {error : "database error"}
    }
}

module.exports = {
    postAvatar,
    getAvatar,
    deleteAvatar,
}