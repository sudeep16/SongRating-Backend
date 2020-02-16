const express = require("express");
const Song = require("../models/songModel");
const router = express.Router();
const authentication = require('../authentication');

router.route("/", authentication.verifyAdmin)
    .post((req, res, next) => {
        console.log(req.body)
        let song = new Song(req.body);
        // console.log(book)
        song.save()
            .then((song) => {
                res.statusCode = 201;
                res.json(song);
            }).catch(next);
    })

    .get((req, res, next) => {
        Song.find()
            .then((song) => {
                res.json(song);
            })
            .catch((err) => {
                next(err);
            });
        });

router.route("/:Genre")
.get((req, res, next) => {
    Song.find({Genre: req.params.Genre})
    .then((song) => {
        console.log(song);
        res.json(song);
    })
    .catch((err) => {
        next(err)
    });
})

router.route("/:id")
.put(authentication.verifyAdmin, (req, res, next) => {
    // console.log(req.songRating);
    Song.findByIdAndUpdate({_id:req.params.id}, { $set: req.body }, { new: true })
        .then((song) => {
            res.json({
                _id: song._id,
                SongTitle: song.SongTitle,
                Artist: song.Artist,
                Genre: song.Genre,
                Duration: song.Duration
            });
        })
        .catch(next);
})
.delete(authentication.verifyAdmin, (req, res, next)=>{
    Song.findOneAndDelete({_id:req.params.id})
    .then((song)=>{
        if(song == null) throw new Error("Song Not Available");
        res.json(song);
    }).catch(next);
});

module.exports = router;
