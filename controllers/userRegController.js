const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/usersModel");
const router = express.Router();

//Registration
router.post("/registration", (req, res, next) => {
    console.log(req.body);
    let password = req.body.Password;   
    bcrypt.hash(password, 7, function(err, hash) {
        if (err) {
            let err = new Error("Could not hash");
            err.status = 500;
            return next(err);
        }
        Users.create({
            Username: req.body.Username,
            Password: hash,
            Email: req.body.Email,
            Address: req.body.Address,
            Gender: req.body.Gender,
            Phone: req.body.Phone,
            Image: req.body.Image
        })
            .then((user) => {
                let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                res.json({
                    status: "!! User Registration Successfull !!",
                    token: token
                });
            })
            .catch(next);
    });
});

//login
router.post("/login", (req, res, next) => {
    console.log(req.body);
    Users.findOne({
        Username: req.body.Username
    })
        .then((user) => {
            if (user == null) {
                let err = new Error("User not found");
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.Password, user.Password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error("Password doesn't match. Try again!");
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({
                            _id: user._id,
                        }, process.env.SECRET);
                        res.json({
                            status: "Login Successful",
                            token: token
                        });
                        console.log(token);
                    }).catch(next);
            }
        }).catch(next);
})

module.exports = router;