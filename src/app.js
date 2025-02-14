// Importar el paquete dotenv para la gestión de variables de entorno
require('dotenv').config();

// Importar el framework Express para la creación de la aplicación web
const express = require('express');

// Importar módulos para el manejo de cookies, análisis de cuerpos de solicitud y registro de solicitudes HTTP
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
const path = require('path');

// Importar el módulo para habilitar el intercambio de recursos entre distintos dominios (CORS)
const cors = require('cors');

// Importar el módulo http de Node.js para crear el servidor
const http = require('http');

// Importar las rutas de la aplicación
// const routes = require('./routes/index');
// const checkApiKey = require('./middlewares/checkApiKey');
// const { checkApiKey } = require('./middlewares/auth.handler');

// Crear una instancia de la aplicación Express
const app = express();

// Configuración de middlewares
app.use(express.json()); // Habilitar el análisis de cuerpos de solicitud en formato JSON
// Configuración de la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev')); // Configurar el registro de solicitudes HTTP en modo desarrollo
app.use(cors()); // Habilitar CORS para permitir solicitudes desde cualquier origen
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // Configurar el análisis de cuerpos de solicitud codificados
app.use(bodyParser.json({ limit: '50mb' })); // Configurar el análisis de cuerpos de solicitud en formato JSON con límite de tamaño
app.use(cookieParser()); // Habilitar el análisis de cookies
// Servir archivos estáticos desde la carpeta 'public'
// app.use(express.static(path.join(__dirname, 'doc')));

// Configuración de CORS para manejar las cabeceras de las solicitudes HTTP
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Actualizar para que coincida con el dominio desde el que se realizará la solicitud
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// app.use('/', routes);

// Middleware de manejo de errores.
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Crear el servidor HTTP y configurar el tiempo de espera
const server = http.createServer(app);
server.timeout = 120000; // Establecer el tiempo de espera en 2 minutos (120000 milisegundos)

// Exportar la aplicación Express configurada
module.exports = server;