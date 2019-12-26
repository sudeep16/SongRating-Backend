var regUsers = require("../models/usersModel.js");
const bcrypt = require("bcrypt");

function register(req, res, next) {
    console.log(req.hashedPassword);
    regUsers.create({
        Name: req.body.name,
        Address: req.body.address,
        Email: req.body.email,
        Gender: req.body.gender,
        Phone: req.body.phone,
        Username: req.body.username,
        Password: req.hashedPassword
    })
        .then(function (result) {
            res.json({
                status: 200,
                message: "user added"
            });
        })
        .catch(function (err) {
            console.log(err);
            res.json({
                status: 500,
                message: "internal error"
            });
        });
};

function hashPassword(req,res,next){
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
        // Store hash in your password DB.
        req.hashedPassword=hash;
        next();
    }).catch(function(err){
        next("Hashing Error");
    });
}

module.exports = {
    register, hashPassword
}

