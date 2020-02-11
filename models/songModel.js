const mongoose = require("mongoose");

const songs = new mongoose.Schema({
    SongTitle: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 50

    },  Artist: {
        type: String,
        required:true
   
    },  Genre: {
        type: String,
        required:true

    },  Duration:{
        type: String,
        required:true

    },  SongFile: {
        type: String,
        required:true

    },  Image:{
        type: String,
        required:true

    },  rater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }
});

module.exports = mongoose.model("Song", songs);