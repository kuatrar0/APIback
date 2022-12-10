var express = require('express')
var router = express.Router()
var UserController = require('../controllers/users.controller');
var UploadController = require('../controllers/upload.controller');
var Authorization = require('../auth/authorization');



/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              email: 
 *                  type: string
 *                  description: mail que se usara para el inicio de sesion
 *              telefono: 
 *                      type: string
 *                      description: telefono para realizar contacto personal con otros usuarios
 *              password:
 *                      type: string
 *                      description: contraseña para iniciar sesion
 *              nombre: 
 *                      type: string
 *                      description: nombre completo del usuario
 *              ciudad:
 *                      type: string
 *                      description: ciudad donde reside el usuario
 *              preguntaSeg:
 *                      type: string
 *                      description: pregunta que se utilizara para el recupero de contraseña
 *              respuesta:
 *                      type: string 
 *                      description: respuesta a la pregunta de seguridad
 *              fechaNac:
 *                      type: string 
 *                      description: fecha de nacimiento del usuario
 *              esProfesor:
 *                      type: boolean 
 *                      description: flag que sirve para saber que tipo de usuario es
 *              titulo: 
 *                      type: string 
 *                      description: titulo profesional del profesor
 *              exp: 
 *                      type: string  
 *                      description: experiencia profesional del profesor
 *              ultimoAlcanzado: 
 *                      type: string 
 *                      description: ultimo estudio alcanzado por el alumno
 *              estadoEstudio: 
 *                      type: string
 *                      description: estado del ultimo estudio
 *              clasesAnotado:
 *                      type: object
 *                      description: array de objetos que marcan las clases a las que un alumno esta anotado. si el usuario es profesor, este array sera vacio.
 *                      properties:
 *                          idclase: 
 *                              type: string  
 *                              description: id de clase 
 *                          idProfesor: 
 *                              type: string  
 *                              description: id del profesor 
 *                          estadoDeClase: 
 *                              type: string
 *                              description: puede ser pendiente, aceptada o rechazada. describe el estado de la solicitud para unirse
 *                          baja: 
 *                              type: boolean  
 *                              description: es true si el alumno decide bajarse de la clase. caso contrario, es false
 *          example:
 *            email: prueba123@mail.com
 *            telefono: "35096123"
 *            password: vivaBoca
 *            nombre: Juan Roman Riquelme
 *            ciudad: Avellaneda
 *            preguntaSeg: ¿cual fue tu apodo en primaria?
 *            respuesta: jrr
 *            fechaNac: 24-6-1978
 *            esProfesor: true
 *            titulo: profesor de magia
 *            exp: enseñe trucos de magia en la mejor escuela del mundo.               
 */








// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de users');
  });




  
  /**
 * @swagger
 * /users/registration:
 *  post:
 *      summary: crea un nuevo usuario. valida mediante un boolean que tipo de usuario sera
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: Succesfully Created User
 *                      
 * 
 * 
 */
router.post('/registration', UserController.createUser)





 /**
 * @swagger
 * /users/login:
 *  post:
 *      summary: inicia la sesion del usuario con el ingreso de un mail y una contraseña
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        email:
 *                          type: string
 *                          description: email del usuario que quiere iniciar sesion
 *                        password:
 *                          type: string
 *                          description: contraseña del usuario que quiere iniciar sesion
 *      responses:
 *          201:
 *              description: Succesfully Created User
 * 
 */
router.post('/login', UserController.loginUser)


// AGREGAR AUTHORIZAITION COMO PARAMETROOOOOOOOO!!!!!
/**
 * @swagger
 * /users/:
 *  get:
 *      summary: trae todos los usuarios registrados
 *      tags: [User]
 *      responses:
 *          201:
 *              description: Succesfully Users Recieved
 * 
 */
router.get('/'/*,Authorization*/, UserController.getUsers) //AGREGAR AUTHORIZATION A TODOS



 /**
 * @swagger
 * /users/userByID:
 *  post:
 *      summary: trae un usuario por su ID
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          description: ID del usuario que se quiere buscar
 *                        
 *      responses:
 *          201:
 *              description: Succesfully User Recieved
 * 
 */

router.post('/userByID'/*, Authorization*/, UserController.getUsersByID)



//router.post('/userByClaseID', Authorization, UserController.getUsersByClaseID)



 /**
 * @swagger
 * /users/userByMail:
 *  post:
 *      summary: trae un usuario por su mail
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        email:
 *                          type: string
 *                          description: mail del usuario que se quiere buscar
 *                        
 *      responses:
 *          201:
 *              description: Succesfully User Recieved
 * 
 */


router.post('/userByMail', Authorization, UserController.getUsersByMail)



 /**
 * @swagger
 * /users/actualizarUser:
 *  put:
 *      summary: actualiza datos del usuario designado
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          description: ID del usuario que se quiere actualizar
 *                        telefono:
 *                          type: string
 *                          description: nuevo telefono que se quiere ingresar
 *                        
 *      responses:
 *          201:
 *              description: Succesfully Updated User
 * 
 */
router.put('/actualizarUser', Authorization, UserController.updateUser)


/**
 * @swagger
 * /users/actualizarUserPass:
 *  put:
 *      summary: actualiza la password del usuario designado
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          description: ID del usuario al que se quiere actualizar la contraseña
 *                        password:
 *                          type: string
 *                          description: nueva contraseña del usuario
 *                        respuesta:
 *                          type: string
 *                          description: respuesta a la pregunta de seguridad
 *                        
 *      responses:
 *          201:
 *              description: Succesfully Updated User
 * 
 */
router.put('/actualizarUserPass'/*, Authorization*/, UserController.updateUserPassword) 






// preguntar como hacer get de pregunta del usuario para mostrar en el front


/*
router.put('/', Authorization, UserController.updateUser)
router.delete('/:id', Authorization, UserController.removeUser)
router.post('/guardarImgUser',UserController.guardarImagenUser)
router.post('/uploadImg',UploadController.uploadFilesImgUser);
router.post('/imgUserByMail',Authorization,UserController.getImagenUserByMail)
router.post('/sendMail',MailController.sendEmail)


*/
// Export the Router
module.exports = router;



