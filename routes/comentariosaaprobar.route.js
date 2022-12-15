var express = require('express')
var router = express.Router()
var ComentarioAAprobarController = require('../controllers/comentarioAAprobar.controller');
var Authorization = require('../auth/authorization');

/**
 * @swagger
 * components:
 *  schemas:
 *      Comentario A Aprobar:
 *          type: object
 *          properties:
 *              claseID: 
 *                  type: string
 *                  description: ID de la clase que se comentara 
 *              profesorID: 
 *                  type: string
 *                  description: ID del profesor que aprobara el comentario
 *              alumnoID:
 *                  type: string
 *                  description: ID del alumno que quiere comentar la clase
 *              nombreAlumno: 
 *                  type: string
 *                  description: Nombre completo del alumno que quiere comentar
 *              clasificacion:
 *                  type: number
 *                  description: clasificacion que le dara el alumno a la clase
 *              estado:
 *                  type: string
 *                  description: estado en el que estara el comentario a aprobar. Puede ser Pendiente, Apronado o Rechazado
 *              comentario:
 *                  type: string
 *                  description: comentario que el alumno quiere realizar
 *              razonDeRechazo:
 *                  type: string 
 *                  description: razon por la cual un profesor decide rechazar el comentario de un usuario
 *                   
 *          example:
 *            claseID: 124578
 *            profesorID: 987654321
 *            alumnoID: 123456789
 *            nombreAlumno: Juan Roman Riquelme
 *            comentario: Avellaneda
 *            clasificacion: 3.4
 *            estado: Rechazado
 *            razonDeRechazo: horrible el comentario
 *                                  
 */                                           
                                               
                                           
 /**
 * @swagger
 * /comentariosaaprobar/creacionComentarioAProbar:
 *  post:
 *      summary: crea un comentario que luego tendra que ser aprobado por un profeosr para poder ser posteado
 *      tags: [Comentario A Aprobar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          claseID:
 *                              type: string
 *                              description: ID de la clase que se comentara
 *                          profesorID: 
 *                              type: string
 *                              description: ID del profesor que aprobara el comentario
 *                          alumnoID:
 *                              type: string
 *                              description: ID del alumno que quiere comentar la clase
 *                          nombreAlumno: 
 *                              type: string
 *                              description: Nombre completo del alumno que quiere comentar
 *                          comentario:
 *                              type: string
 *                              description: comentario que el alumno quiere realizar
 *                          clasificacion:
 *                              type: number
 *                              description: clasificacion que le dara el alumno a la clase
 *      responses:
 *          201:
 *              description: Succesfully Created Comentario A Aprobar
 * 
 */
router.post('/creacionComentarioAProbar', ComentarioAAprobarController.createComentario)


 /**
 * @swagger
 * /comentariosaaprobar/aprobarComentario:
 *  post:
 *      summary: aprueba el comentario y lo agrega en la clase
 *      tags: [Comentario A Aprobar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                              despcripcion: ID del comentario que se aprobo
 *                          claseID:
 *                              type: string
 *                              description: ID de la clase que se comentara
 *                          textoComentario: 
 *                              type: string
 *                              description: comentario que el alumno quiere realizar
 *                          idAlu:
 *                              type: string
 *                              description: ID del alumno que quiere comentar la clase
 *                          nombreAlu: 
 *                              type: string
 *                              description: Nombre completo del alumno que quiere comentar
 *                          clasificacionComent:
 *                              type: Number
 *                              description: clasificacion que le dara el alumno a la clase
 *      responses:
 *          201:
 *              description: Succesfully Comentario Aprobado
 * 
 */
router.post('/aprobarComentario', ComentarioAAprobarController.aprobarComentario)

 /**
 * @swagger
 * /comentariosaaprobar/rechazarComentario:
 *  post:
 *      summary: rechaza el comentario y realiza una baja logica
 *      tags: [Comentario A Aprobar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                              despcripcion: ID del comentario que se rechazo
 *                          razonDeRechazo: 
 *                              type: string
 *                              description: razon por la cual se rechazo el comentario
 *      responses:
 *          201:
 *              description: Succesfully Comentario Aprobado
 * 
 */
router.post('/rechazarComentario', ComentarioAAprobarController.rechazarComentario)




 /**
 * @swagger
 * /comentariosaaprobar/getComentariosAAprobarPID:
 *  post:
 *      summary: trae los comentarios pendiendtes de un profesor mediante un ID
 *      tags: [Comentario A Aprobar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      profesorID: 
 *                          type: string
 *                          description: ID del profesor del que se deseen ver los comentarios pendientes
 *      responses:
 *          201:
 *              description: Succesfully Comentarios A Aprobar Recieved
 * 
 */
router.post('/getComentariosAAprobarPID', ComentarioAAprobarController.getComentariosAAprobarByidProfesor)





module.exports = router;












