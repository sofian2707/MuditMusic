'use strict'

/* Cargar librerías 
express: Biblioteca para construir aplicaciones web y APIs con Node.js.
cors: Middleware para habilitar Cross-Origin Resource Sharing (CORS).
bodyParser: Middleware para analizar el cuerpo de las solicitudes HTTP.
app: Crea una instancia de la aplicación Express.
*/

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

// Cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var song_routes = require('./routes/song');
var favsong_routes = require('./routes/favsong');

 /* Configurar CORS: Habilita CORS para permitir solicitudes desde cualquier origen 
 (origin: '*') y define los métodos HTTP permitidos.*/
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Configuración de cabeceras HTTP, Configura las cabeceras HTTP necesarias 
para manejar CORS y especifica los métodos HTTP permitidos.*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

 /* Rutas base, Se importan las rutas para manejar diferentes entidades de la aplicación: 
 usuarios, artistas, álbumes, canciones y canciones favoritas.*/

app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);
app.use('/api', favsong_routes);

/*Exporta la instancia de la aplicación Express configurada para que pueda ser utilizada 
en otros módulos, como el archivo principal que inicia el servidor. */

module.exports = app;
