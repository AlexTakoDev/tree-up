const pool = require('../poolDB');
const Like = require('../model/likeModel')

const postLike = async (data) => {
    const {user, uuid_project} = data;
    const like = new Like(null,user.user.uuid, uuid_project);
    const querySelect = `SELECT * FROM likes WHERE user_uuid ='${like.getUserUUID()}' AND project_uuid ='${like.getProjectUUID()}' `;
    const queryInsert = `INSERT INTO likes (user_uuid, project_uuid, like_date) VALUES ($1, $2, $3) RETURNING like_uuid`;
    const queryDelete = `DELETE FROM likes WHERE user_uuid ='${like.getUserUUID()}' AND project_uuid ='${like.getProjectUUID()}' `
    
    const selectResult = await pool.query(querySelect).catch((err) => {
        console.log(err)
        return {error : err}
    });
    if(selectResult.rows.length === 0){
        const insertResult = await pool.query(queryInsert, like.getArrayInsert()).catch((err) => {
            console.log(err);
            return err
        });
        if(insertResult.rows[0].like_uuid){
            return {isliked : true}
        }
    } else {
        const deleteresult = await pool.query(queryDelete).catch((err) => {console.log(err)});
        return {isliked : false}
    }
}

const getProjectLikeByUser = async (data) => {
    const {user, uuid_project} = data;
    const like = new Like(null,user.uuid, uuid_project);
    const querySelect = `SELECT * FROM likes WHERE user_uuid ='${like.getUserUUID()}' AND project_uuid ='${like.getProjectUUID()}' `;
    const selectResult = await pool.query(querySelect).catch((err) => {console.log(err)});
    return {like : selectResult.rows.length !== 0};
}

const getLikesByProject = async (data) => {
    const {uuid_project} = data
    const querySelect = `SELECT COUNT(*) FROM likes WHERE project_uuid = '${uuid_project}'`
    const selectResult = await pool.query(querySelect).catch((err) => {console.log(err)});
    return selectResult.rows[0];
}

module.exports = {
    postLike,
    getProjectLikeByUser,
    getLikesByProject,
}