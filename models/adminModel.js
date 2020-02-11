const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 50

    },  Password: {
        type: String,
        required:true
   
    }
});

module.exports = mongoose.model("Admin", admin);