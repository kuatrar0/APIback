var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClaseSchema = new mongoose.Schema({  // sacar VAR
    idProfesor: { type:Number, required: true},
    profesor: { type:String, required: true},
    materia:{ type:String, required: true},
    duracion:{ type:Number, required: true},
    frequencia: { type:String, required: true},
    costo: { type:Number, required: true},
    clasificacion: { type:Number, required: false},
    estadoClase: { type:String, required: true},//publica - oculta
    descripcion: { type:String, required: true},
    alumnos:[{
        idAlu : String,
        nombreAlu: String
    }],
    comentarios:[{
        idAlu : String,
        nombreAlu: String,
        textoComentario: String,
        calsificacionComent: Number,
    }]

})

ClaseSchema.plugin(mongoosePaginate)
const Clase = mongoose.model('Clase', ClaseSchema)

module.exports = Clase;
