const express = require("express");
const multer = require("multer");
const path = require("path");

const songStorage = multer.diskStorage({
    destination: "./public/songs",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const songFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(mp3)$/)) {
        return cb(new Error("You can upload only song files"), false);
    }
    cb(null, true);
};

const songUpload = multer({
    storage: songStorage,
    fileFilter: songFileFilter
})

const uploadSongRouter = express.Router();

uploadSongRouter.route("/")
    .post(songUpload.single("songFile"), (req, res) => {
        res.json(req.file);
    });

module.exports = uploadSongRouter;