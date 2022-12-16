var express = require('express')
var router = express.Router()
var ClaseController = require('../controllers/clases.controller');
var Authorization = require('../auth/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *      Clase:
 *          type: object
 *          properties:
 *              idProfesor:
 *                  type: string
 *                  description: id del profesor a cargo de la materia
 *              profesor: 
 *                  type: string
 *                  description: nombre del profesor a cargo de la materia
 *              materia:
 *                  type: string
 *                  description: materia que se enseñara en la clase
 *              duracion: 
 *                  type: number
 *                  description: duaracion en horas de la clase
 *              frequencia:
 *                  type: string
 *                  description: frequencia con la que se dara la clase 
 *              costo:
 *                  type: number
 *                  description: costo de la clase
 *              clasificacion:
 *                  type: number 
 *                  description: clasificacion que tiene la clase
 *              estadoClase:
 *                  type: string 
 *                  description: estado en el que la clase se encuentra. puede ser publica u oculta
 *              eliminado:
 *                  type: boolean 
 *                  description: flag que sirve para saber si la clase fue eliminada
 *              descripcion: 
 *                  type: string 
 *                  description: descripcion de la clase
 *              tipo: 
 *                  type: string
 *                  descripcion: tipo de clase que sera    
 *              alumnos: 
 *                  type: object  
 *                  properties:
 *                      idAlu:
 *                          type: string
 *                          description: id del usuario que comento
 *                      nombreAlu:
 *                          type: string
 *                          description: nombre del usuario en la clase
 *                      baja:
 *                          type: boolean
 *                          description: flag que estara en true si un usuario se da de baja. caso contrario sera false
 *              comentarios: 
 *                  type: object  
 *                  properties:
 *                      idAlu:
 *                          type: string
 *                          description: id del usuario que comento
 *                      nombreAlu:
 *                          type: string
 *                          description: nombre del usuario que comento
 *                      textoComentario:
 *                          type: string
 *                          description: comentario del usuario
 *                      clasificacionComent:
 *                          type: number
 *                          description: materia que se enseñara en la clase
 *                          
 *                                                          
 *                                                              
 *          example:
 *            idProfesor: "637ffc460bfa0e1c089489cf"
 *            profesor: Juan Roman Riquelme
 *            materia: Caños
 *            duracion: 49
 *            frecuencia: Semanal
 *            costo: 450
 *            clasificacion: 4
 *            estadoClase: true
 *            eliminado: false
 *            descripcion: van a aprender a jugar al futbol como se debe
 *            alumnos:
 *              idAlu: idGenerico 
 *              nombreAlu: Tito Gonzalez
 *              baja: false
 *            comentarios:
 *              idAlu: "unIDgenerico2"
 *              nombreAlu: Julian Alvarez
 *              textoComentario: me re gusto la clase. muy buena
 *              clasificacionComent: 5
 *                       
 */



 /**
 * @swagger
 * /clases/creacionClase:
 *  post:
 *      summary: crea una clase nueva.
 *      tags: [Clase]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        idProfesor:
 *                          type: string
 *                          description: id del profesor que creara la clase
 *                        profesor:
 *                          type: string
 *                          description: nombre completo del profesor 
 *                        materia:
 *                          type: string
 *                          description: materia que 
 *                        duracion: 
 *                          type: number
 *                          description: duaracion en horas de la clase
 *                        frequencia:
 *                          type: string
 *                          description: frequencia con la que se dara la clase 
 *                        costo:
 *                          type: number
 *                          description: costo de la clase
 *                        descripcion: 
 *                          type: string 
 *                          description: descripcion de la clase
 *      responses:
 *          201:
 *              description: Succesfully Created Clase
 * 
 */

router.post('/creacionClase', ClaseController.createClase)



 /**
 * @swagger
 * /clases/getClasesPID:
 *  post:
 *      summary: trae las clases que un profesor tiene registradas mediante un ID
 *      tags: [Clase]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        idProfesor:
 *                          type: string
 *                          description: id del profesor para buscar sus clases
 *                        
 *      responses:
 *          201:
 *              description: Succesfully Clases Recieved
 * 
 */


router.post('/getClasesPID', ClaseController.getClasesByidProfesor)


/**
 * @swagger
 * /clases/getClases:
 *  get:
 *      summary: trae todos las clases existentes
 *      tags: [Clase]
 *      responses:
 *          201:
 *              description: Succesfully Clases Recieved
 * 
 */
router.get('/getClases', ClaseController.getClases)

/**
 * @swagger
 * /clases/getClasesActivas:
 *  get:
 *      summary: trae todos las clases existentes que no esten ocultas o eliminadas
 *      tags: [Clase]
 *      responses:
 *          201:
 *              description: Succesfully Clases Recieved
 * 
 */
router.get('/getClasesActivas', ClaseController.getClasesActivas)

/**
 * @swagger
 * /clases/getComentarios:
 *  post:
 *      summary: trae todos los comentarios de una clase existente
 *      tags: [Clase]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        idClase:
 *                          type: string
 *                          description: ID de la clase que se quiere buscar
 *                        
 *      responses:
 *          201:
 *              description: Succesfully Comentarios Recieved
 * 
 */
router.post('/getComentarios', ClaseController.getComentariosDeClase)

/**
 * @swagger
 * /clases/getAlumnos:
 *  post:
 *      summary: trae todos los alumnos de una clase existente que esten cursando
 *      tags: [Clase]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          description: ID de la clase que se quiere buscar
 *                        
 *      responses:
 *          201:
 *              description: Succesfully Alumnos Recieved
 * 
 */
router.post('/getAlumnosCursando', ClaseController.getAlumnosCursando)
// TENGO QUE CREAR ESTOOO
/**
 * @swagger
 * /clases/bajaClase:
 *  post:
 *      summary: se le otorgara la baja por cancelamiento o finalizacion de cursada a un alumno
 *      tags: [Clase]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        idClase:
 *                          type: string
 *                          description: ID de la clase que se quiere bajar
 *                        estadoAlu:
 *                          type: string
 *                          description: el nuevo estado del alumno en la clase. puede ser "cancelado" o "finalizado"
 *                        idAlu:
 *                          type: string
 *                          description: id del usuario que quiere bajarse
 *      responses:
 *          201:
 *              description: Succesfully Alumnos Recieved
 * 
 */
router.post('/bajaClase', ClaseController.bajaClase)



/**
 * @swagger
 * /clases/eliminarClase:
 *  post:
 *      summary: elimina la clase que el profesor desee
 *      tags: [Clase]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          description: ID de la clase que se quiere eliminar
 *      responses:
 *          201:
 *              description: Succesfully Clase Deleted
 */
router.post('/eliminarClase', ClaseController.eliminarClase)



/**
 * @swagger
 * /clases/modificarClase:
 *  put:
 *      summary: modifica la duracion, frecuencia y costo de una clase
 *      tags: [Clase]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          description: ID de la clase que se quiere eliminar
 *                        duracion: 
 *                          type: number
 *                          description: nueva duaracion en horas de la clase
 *                        frequencia:
 *                          type: string
 *                          description: nueva frequencia con la que se dara la clase 
 *                        costo:
 *                          type: number
 *                          description: nuevo costo de la clase
 *      responses:
 *          201:
 *              description: Succesfully Clase Deleted
 */
router.put('/modificarClase', ClaseController.modificarClase)

/**
 * @swagger
 * /clases/modificarEstado:
 *  put:
 *      summary: cambia el estado de una clase a publica u oculta
 *      tags: [Clase]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          description: ID de la clase que se quiere eliminar
 *                        estadoClase: 
 *                          type: string
 *                          description: nuevo estado de la clase. puede ser oculta o publico
 *      responses:
 *          201:
 *              description: Succesfully Estado de Clase Changed
 */
router.put('/modificarEstado', ClaseController.modificarEstado)





module.exports = router;











