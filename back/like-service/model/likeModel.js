class Like {
    constructor(like_uuid, user_uuid, project_uuid,){
        this.like_uuid = like_uuid ? like_uuid : "";
        this.user_uuid = user_uuid;
        this.project_uuid = (project_uuid === "") ? null : project_uuid;
        this.date = new Date();
    }

    getArrayInsert(){
        return [this.user_uuid, this.project_uuid, this.date];
    }

    getLikeUUID(){
        return this.like_uuid;
    }

    getUserUUID(){
        return this.user_uuid;
    }

    getProjectUUID(){
        return this.project_uuid ? this.project_uuid : null;
    }

    getDate(){
        return this.date;
    }

}

module.exports = Like;