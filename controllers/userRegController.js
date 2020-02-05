const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/usersModel");
const router = express.Router();

//Registration
router.post("/registration", (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 7, (err, hash) => {
        console.log(err);
        if (err) {
            let err = new Error("Could not hash");
            err.status = 500;
            return next(err);
        }
        Users.create({
            Username: req.body.username,
            Password: hash,
            Email: req.body.email,
            Address: req.body.address,
            Gender: req.body.gender,
            Phone: req.body.phone,
            Image: req.body.image
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
    User.findOne({
        username: req.body.username
    })
        .then((user) => {
            if (user == null) {
                let err = new Error("User not found");
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
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
                            status: "Login successful",
                            token: token
                        });
                        console.log(token);
                    }).catch(next);
            }
        }).catch(next);
})

module.exports = router;