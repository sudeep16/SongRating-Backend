var regUsers = require("../models/usersModel.js");

function register(req, res, next) {
    regUsers.create({
        Name: req.body.name,
        Address: req.body.address,
        Email: req.body.email,
        Gender: req.body.gender,
        Phone: req.body.phone,
        Username: req.body.username,
        Password: req.body.password
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

module.exports = {
    register
}

