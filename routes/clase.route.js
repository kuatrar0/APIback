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
 *                      type: string
 *                      description: nombre del profesor a cargo de la materia
 *              materia:
 *                      type: string
 *                      description: materia que se enseñara en la clase
 *              duracion: 
 *                      type: number
 *                      description: duaracion en horas de la clase
 *              frequencia:
 *                      type: string
 *                      description: frequencia con la que se dara la clase 
 *              costo:
 *                      type: number
 *                      description: costo de la clase
 *              clasificacion:
 *                      type: number 
 *                      description: clasificacion que tiene la clase
 *              estadoClase:
 *                      type: string 
 *                      description: estado en el que la clase se encuentra. puede ser publica u oculta
 *              eliminado:
 *                      type: boolean 
 *                      description: flag que sirve para saber si la clase fue eliminada
 *              descripcion: 
 *                      type: string 
 *                      description: descripcion de la clase
 *              alumnos: 
 *                      type: object  
 *                      properties:
 *                          idAlu:
 *                              type: string
 *                              description: id del usuario que comento
 *                          nombreAlu:
 *                              type: string
 *                              description: nombre del usuario en la clase
 *                          baja:
 *                              type: boolean
 *                              description: flag que estara en true si un usuario se da de baja. caso contrario sera false
 *              comentarios: 
 *                      type: object  
 *                      properties:
 *                          idAlu:
 *                              type: string
 *                              description: id del usuario que comento
 *                          nombreAlu:
 *                              type: string
 *                              description: nombre del usuario que comento
 *                          textoComentario:
 *                              type: string
 *                              description: comentario del usuario
 *                          clasificacionComent:
 *                              type: number
 *                              description: clasificacion dada por el usuario
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






router.post('/creacionClase', ClaseController.createClase)
router.post('/getClasesPID', ClaseController.getClasesByidProfesor)
router.get('/getClases', ClaseController.getClases)
router.get('/getClasesActivas', ClaseController.getClasesActivas)
router.post('/getComentarios', ClaseController.getComentariosDeClase)
router.post('/getAlumnos', ClaseController.getAlumnos)
router.post('/bajaClase', ClaseController.bajaClase)
router.post('/eliminarClase', ClaseController.eliminarClase)
router.put('/modificarClase', ClaseController.modificarClase)
router.put('/modificarEstado', ClaseController.modificarEstado)





module.exports = router;











