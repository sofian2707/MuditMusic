'use strict'

//acceso a la bd
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema 
var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Artist', ArtistSchema);