var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var SolicitudUnirseSchema = new mongoose.Schema({
    // agregue nombre alu. tengo que agregarlo en controller y service. 
    //tambien tengo que agregar todo los atrib de la clase a la que se quiere unir
    claseID: String,
    alumnoID: String,
    solicitud: String,
    horario: String, 
    estado: String, //puede ser Pendiente, Aprobado o Rechazado
    profesor: String, 
    materia: String,
    nombreAlu: String,
    mail: String
})

SolicitudUnirseSchema.plugin(mongoosePaginate)
const SolicitudUnirse = mongoose.model('SolicitudUnirse', SolicitudUnirseSchema)

module.exports = SolicitudUnirse;