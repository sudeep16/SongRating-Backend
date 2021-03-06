const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const UsersRegistered = require("../models/usersModel")
const authentication = require("../authentication")
const router = express.Router();

//Registration
router.post("/adminRegister", (req, res, next) => {
    console.log(req.body);
    let password = req.body.Password;
    bcrypt.hash(password, 7, function (err, hash) {
        if (err) {
            let err = new Error("Hashing is Unsuccessful");
            err.status = 500;
            return next(err);
        }
        Admin.create({
            Username: req.body.Username,
            Password: hash,
        })
            .then((admin) => {
                let token = jwt.sign({ _id: admin._id }, process.env.SECRET);
                res.json({
                    status: "!! Admin Registration Successfull !!",
                    token: token
                });
            })
            .catch(next);
    });
});

//login
router.post("/adminLogin", (req, res, next) => {
    console.log(req.body);
    Admin.findOne({
        Username: req.body.Username
    })
        .then((admin) => {
            if (admin == null) {
                let err = new Error("You are not an Admin");
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.Password, admin.Password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error("Password doesn't match. Try again!");
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({
                            _id: admin._id,
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

router.get("/userList", authentication.verifyAdmin, (req, res, next) => {
    UsersRegistered.find()
        .then((users) => {
            console.log(users);
            res.json(users)
        })
        .catch((err) => {
            next(err)
        })
})

router.route("/userList/:id")
    .delete(authentication.verifyAdmin, (req, res, next) => {
        UsersRegistered.findOneAndDelete({ _id: req.params.id })
            .then((users) => {
                if (users == null) throw new Error("User Not Found");
                res.json(users)
            }).catch(next)
    })


module.exports = router;