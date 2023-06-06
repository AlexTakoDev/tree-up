class UserAvatar {
    constructor(user_uuid, filename, filepath, filetype, size) {
        this.user_uuid = user_uuid,
        this.filename = filename,
        this.filepath = filepath,
        this.filetype = filetype,
        this.size = size
    }

    getUserUUID(){
        return this.user_uuid
    }

    getFileName(){
        return this.filename
    }

    getFilePath(){
        return this.filepath
    }

    getFileType(){
        return this.filetype
    }

    getSize(){
        return this.size
    }

    getArrayInsert(){
        return [
            this.user_uuid,
            this.filename,
            this.filepath,
            this.filetype,
            this.size
        ]
    }
}

module.exports = UserAvatar;