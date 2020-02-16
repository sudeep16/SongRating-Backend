const mongoose = require("mongoose");

const userSong = new mongoose.Schema({
    SongTitle: {
        type: String,
        required: true,

    },  Artist: {
        type: String,
        required:true
   
    },  Genre: {
        type: String,
        required:true

    },  Duration:{
        type: String,
        required:true

    },  Image:{
        type: String,

    },  Rating:{
        type: String,

    },  rater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }
});

module.exports = mongoose.model("UserSong", userSong);