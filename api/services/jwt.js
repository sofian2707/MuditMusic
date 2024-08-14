'use strict'

/* Importación de las librerías jwt-simple y moment, y creación de una variable secreta.
jwt-simple: Biblioteca para crear y decodificar JSON Web Tokens (JWT).
moment: Biblioteca para manejar fechas y horas de manera sencilla.
secret: Clave secreta utilizada para codificar y decodificar los tokens JWT. */
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso';


/* Función para crear un token con la información del usuario. 
Exporta la función createToken para que pueda ser utilizada en otros módulos.
La función toma como parámetro un objeto user que contiene la información del usuario.
*/
exports.createToken = function(user){
    var payload = {
        sub: user._id,          // Identificador único del usuario
        name: user.name,        // Nombre del usuario
        surname: user.surname,  // Apellido del usuario
        email: user.email,      // Correo electrónico del usuario
        role: user.role,        // Rol del usuario
        image: user.image,      // Imagen del usuario
        iat: moment().unix(),   // Fecha de creación del token en formato Unix
        exp: moment().add(30, 'days').unix() // Fecha de expiración del token en formato Unix (30 días después de su creación)
    };

    /* Codificación del payload con la clave secreta. */
    return jwt.encode(payload, secret);
};
