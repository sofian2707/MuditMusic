/* A directive that tells the browser to use strict mode. */
'use strict'

/* Importing the jwt-simple and moment modules. */
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso';


/* Checking if the request has the authorization header. */
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticacion'});
    }

    /* Removing the double quotes from the token. */
    var token = req.headers.authorization.replace(/['""']+/g, '');

    /* Checking if the token is valid. */
    try{
       /* Decoding the token */
        var payload = jwt.decode(token, secret);
        /* Checking if the token has expired. */
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'El token ha expirado'});
        }
    }
    catch(ex){
        //console.log(ex);
        return res.status(404).send({message: 'Token no valido'});
    }

   /* Adding the payload to the request object. */
    req.user = payload;

    /* Calling the next middleware in the chain. */
    next();


};