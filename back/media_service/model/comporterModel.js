class ComporterModel {
 constructor( techno_uuid, proyect_uuid) {
  
  this.techno_uuid = techno_uuid;
  this.proyect_uuid = proyect_uuid;
 }


 
 gettechno_uuid() {
  return this.techno_uuid;
 }
 
 getproyect_uuid() {
  return this.proyect_uuid;
 }
}

module.exports = ComporterModel; 