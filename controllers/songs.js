const express = require("express");
const Song = require("../models/songModel");
const router = express.Router();
const authentication = require('../authentication');

router.route("/", authentication.verifyAdmin)
    .post((req, res, next) => {
        let song = new Song(req.body);
        // console.log(book)
        song.save()
            .then((song) => {
                res.statusCode = 201;
                res.json(song);
            }).catch(next);
    });

router.route("/:Genre")
.get((req, res, next) => {
    Song.find({categories: req.params.Genre})
    .then((song) => {
        console.log(song);
        res.json(song);
    })
    .catch((err) => {
        next(err)
    });
})

module.exports = router;
