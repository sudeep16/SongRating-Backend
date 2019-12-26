var db = require("../config/dbConfig.js");
var user = db.sequelize.define("usersRegistered", {
    Id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },  Name: {
        type: db.Sequelize.TEXT,
        allowNull: false

    },  Address: {
        type: db.Sequelize.TEXT,
        allowNull: false

    },  Email: {
        type: db.Sequelize.TEXT,
        allowNull: false

    },  Gender: {
        type: db.Sequelize.TEXT,
        allowNull: false

    },  Phone:{
        type: db.Sequelize.BIGINT,
        allowNull:false

    },  Username: {
        type: db.Sequelize.TEXT,
        allowNull: false

    },  Password: {
        type: db.Sequelize.TEXT,
        allowNull: false

    }
    
},
{
    //Prevent from creating different tables of same name 
    freezeTableName: true,

});

user.sync({
    force: false
})
.then(function(){

}).catch(function(error){
    console.log(error);
});

module.exports = user;