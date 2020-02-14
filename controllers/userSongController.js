const express = require("express");
const userSong = require("../models/usersSongs");
const router = express.Router();

router.route("/")
    .post((req, res, next) => {
        let uSong = new userSong(req.body);
        uSong.rater = req.user._id;
        console.log(uSong)
        uSong.save()
            .then((uSong) => {
                res.statusCode = 201;
                res.json(uSong);
            }).catch(next);
    })
    .get((req,res, next) =>{
        userSong.find({rater: req.user._id})
        .then((uSong) => {
            console.log(uSong);
            res.json(uSong);
        })
        .catch((err) =>{
            next(err);
        })
    })
    .delete((req, res, next) => {
        userSong.findOneAndDelete({ rater: req.user._id })
            .then((uSong) => {
                if (uSong == null) throw new Error("Song not found");
                res.json(uSong);
            }).catch(next);
    })
module.exports = router;