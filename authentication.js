const jwt = require("jsonwebtoken");
const UsersRegistered = require("./models/usersModel.js")
const Admin = require("./models/adminModel")

module.exports.verifyUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error("Bearer token is not set");
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(" ")[1];
    let data;
    // console.log(data);
    try {
        data = jwt.verify(token, process.env.SECRET);
    } catch (err) {
        // console.log(err);
        throw new Error("Token not verified");
    }

    
    UsersRegistered.findById(data._id)
        .then((user) => {
            req.user = user;
            // console.log(req.user);
            next();
        })
}

module.exports.verifyAdmin = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error("Bearer token is not set!");
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(" ")[1];
    let data;
    try {
        data = jwt.verify(token, process.env.SECRET);
    } catch (err) {
        throw new Error('Token could not be verified!');
    }
    Admin.findById(data._id)
        .then((admin) => {
            req.admin = admin;
            next();
        })
}