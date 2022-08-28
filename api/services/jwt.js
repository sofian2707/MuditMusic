'use strict'

/* Importing the jwt-simple and moment modules and creating a secret variable. */
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso';

/* Creating a token with the user information. */
exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

   /* Encoding the payload with the secret. */
    return jwt.encode(payload, secret);
 
};