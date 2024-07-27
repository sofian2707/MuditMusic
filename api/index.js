'use strict'

// Importación de módulos
var mongoose = require('mongoose');
var app = require('./app');

// Configuración del puerto del servidor web
var port = process.env.PORT || 3000;

// Configuración de la conexión a la base de datos

// Configuración de Promesas para mongoose
mongoose.Promise = global.Promise;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/curso_mean', (err, res) => {
    // Callback que se ejecuta después de intentar conectar a la base de datos
    if(err){
        // Si hay un error, se lanza una excepción
        throw err;
    } else {
        // Si la conexión es exitosa, se imprime un mensaje en la consola
        console.log("La conexión a la base de datos funciona correctamente");

        // Inicio del servidor web
        app.listen(port, function(){
            // Se imprime un mensaje indicando que el servidor está escuchando en el puerto configurado
            console.log("Servidor del API REST de música escuchando en http://localhost:" + port);
        });
    }
});
