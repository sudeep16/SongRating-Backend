const mongoose = require("mongoose");

const users = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 50

    },  Password: {
        type: String,
        required:true
   
    },  Email: {
        type: String,
        required:true

    },  Phone:{
        type: String,
        required:true
    
    },  Address: {
        type: String,
        required:true

    },  Gender: {
        type: String,
        required:true
    
    },  Image: {
        type: String
    }
});

module.exports = mongoose.model("UsersRegistered", users);