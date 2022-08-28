'use strict'

//acceso a la bd
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema 
var SongSchema = Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: {type: Schema.ObjectId, ref: 'Album'}
});

module.exports = mongoose.model('Song', SongSchema);