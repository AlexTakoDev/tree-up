class Techno {
  constructor(uuid , name, link, picture, description) {
   this.uuid = uuid;
    this.name = name;
    this.link = link;
    this.picture = picture;
    this.description = description;
    
  }

  getUuid() {
    return this.uuid;
  }

  getName() {
    return this.name;
  }

  getLink() {
    return this.link;
  }

  getPicture() {
    return this.picture;
  }

  getDescription() {
    return this.description;
  }


}

module.exports = Techno;


