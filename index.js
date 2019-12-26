"use strict";
var userRegController = require("./controllers/userRegController.js");
const express = require("express");
const rateApp = express();
const bodyParser = require("body-parser");

rateApp.use(bodyParser.urlencoded({extended:true}));

rateApp.post("/register", userRegController.register);




rateApp.listen(3011)

