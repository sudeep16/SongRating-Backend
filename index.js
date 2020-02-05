const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const usersRoute =  require("./controllers/userRegController")
const imageRoute = require("./controllers/upload")

//Calling Classes
const authentication = require("./authentication")

const rateapp = express();
rateapp.options("*", cors());
rateapp.use(morgan("tiny"));
rateapp.use(express.json());
rateapp.use(express.urlencoded({ extended: true }));
rateapp.use(express.static(__dirname + "/public"));

//Routes
rateapp.use("/users", usersRoute);
rateapp.use("/upload", imageRoute);
rateapp.use(authentication.verifyUser);

//Database Connection
mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((db) => {
    console.log("Successfully connected to MongoDB server");
}, (err) => console.log(err));


rateapp.listen(process.env.PORT,()=>{
    console.log(`App is running at localhost:${process.env.PORT}`);
});

//error handler
rateapp.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});