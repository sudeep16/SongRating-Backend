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

// router.route("/:categories")
// .get((req, res, next) => {
//     Book.find({categories: req.params.categories})
//     .then((books) => {
//         console.log(books);
//         res.json(books);
//     })
//     .catch((err) => {
//         next(err)
//     });
// })

module.exports = router;
