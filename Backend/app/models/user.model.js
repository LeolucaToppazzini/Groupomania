const db = require("../models");
const Tutorial = db.tutorials;

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    User.associate = function(models) {
        User.hasMany(models.tutorials, {
            foreignKey: 'user_id',
            as: "tutorials"
        });
    };

    return User;
};




/*
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};
*/
