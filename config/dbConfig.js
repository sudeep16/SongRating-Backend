var Sequelize = require("sequelize");

var sequelize = new Sequelize("songratingsystem", "sudeep", "P@ssword12", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

sequelize.authenticate().then(
    function(){
        console.log("Database connected successfully");
    }
).catch(
    function(err){
        console.log(err);
    }
);

module.exports = {
    Sequelize, sequelize
}
