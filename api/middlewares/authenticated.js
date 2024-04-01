/* Una directiva que indica al navegador usar el modo estricto. */
'use strict';

/* Importando los módulos jwt-simple y moment. */
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso';

/* Comprobando si la solicitud tiene el encabezado de autorización. */
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});
    }

    /* Eliminando las comillas dobles del token. */
    var token = req.headers.authorization.replace(/['""']+/g, '');

    /* Comprobando si el token es válido. */
    try {
        /* Decodificando el token. */
        var payload = jwt.decode(token, secret);
        /* Comprobando si el token ha expirado. */
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'El token ha expirado'});
        }
    }
    catch(ex){
        //console.log(ex);
        return res.status(404).send({message: 'Token no válido'});
    }

    /* Añadiendo el payload al objeto de solicitud (request). */
    req.user = payload;

    /* Llamando al siguiente middleware en la cadena. */
    next();
};
