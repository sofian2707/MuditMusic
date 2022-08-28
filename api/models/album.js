'use strict'

//acceso a la bd
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema para el modelo de Album

var AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    //relaciona album con artista
    artist: { type: Schema.ObjectId, ref: 'Artist'}
});

/* Exporting the model Album to be used in other files. */
module.exports = mongoose.model('Album', AlbumSchema);