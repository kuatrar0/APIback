var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var AlumnosEnClaseSchema = new mongoose.Schema({
    AlumnoID: String,
    ClaseID: String
})

AlumnosEnClaseSchema.plugin(mongoosePaginate)
const AlumnosEnClase = mongoose.model('AlumnosEnClase', AlumnosEnClaseSchema)

module.exports = AlumnosEnClase;
