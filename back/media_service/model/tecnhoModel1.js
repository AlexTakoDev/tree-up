class Techno1 {
 constructor(name, link, picture, description) {

   this.name = name;
   this.link = link;
   this.picture = picture;
   this.description = description;
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

module.exports = Techno1;