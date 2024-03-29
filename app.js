//Express
var express = require('express');
var cookieParser = require('cookie-parser');
var bluebird = require('bluebird');
const path = require("path")
//swagger
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TeachUp",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:4000"
      },
    ],
  },

  apis: [`${path.join(__dirname, "./routes/*.js")}`]
}
//incorporo cors
var cors = require('cors');

//importo router
var indexRouter = require('./routes/index');
var apiRouterUser = require('./routes/user.route'); //Custom
var apiRouterClase = require('./routes/clase.route');
var apiRouterCAA = require('./routes/comentariosaaprobar.route');
var apiRouterSolicitudUnirse = require('./routes/solicitudunirse.route');
var utilRouter = require('./routes/utils');

//instancio el servidor
var app = express();

//engine que permite renderizar paginas web
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//aplico cors
app.use(cors());
app.use(cookieParser());


//swagger middle
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))


//Indico las rutas de los endpoint
app.use('/users', apiRouterUser);
app.use('/clases', apiRouterClase)
app.use('/caa', apiRouterCAA)
app.use('/solicitudunirse', apiRouterSolicitudUnirse)
app.use('/', indexRouter);
app.use('/utils/', utilRouter);

//onsole.log("processENV",process.env);
if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}


//Database connection --
var mongoose = require('mongoose')
mongoose.Promise = bluebird;
let url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`
console.log("BD", url);
let opts = {
  useNewUrlParser: true,
  connectTimeoutMS: 20000,
  useUnifiedTopology: true
};

mongoose.connect(url, opts)
  .then(() => {
    console.log(`Succesfully Connected to theMongodb Database..`)
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database...`),
      console.log(e)
  })


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

});


// Setup server port
var port = process.env.PORT || 8080;
// Escuchar en el puerto
app.listen(port, () => {
  console.log('Servidor de ABM Users iniciado en el puerto ', port);
});


/*
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api/swagger/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


*/

module.exports = app;