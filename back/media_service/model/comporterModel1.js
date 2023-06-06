class ComporterModel {
 constructor(comporte_uuid, techno_uuid, proyect_uuid) {
  this.comporte_uuid = comporte_uuid;
  this.techno_uuid = techno_uuid;
  this.proyect_uuid = proyect_uuid;
 }

 getcomporte_uuid() {
  return this.comporte_uuid;
 }
 
 gettechno_uuid() {
  return this.techno_uuid;
 }
 
 getproyect_uuid() {
  return this.proyect_uuid;
 }
}

module.exports = ComporterModel; 