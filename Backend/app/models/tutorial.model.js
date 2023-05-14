const db = require("../models");
const User = db.users;

module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        image_url: {
            type: Sequelize.STRING
        }
    });

    Tutorial.associate = function(models) {
        Tutorial.belongsTo(db.users, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };

    return Tutorial;
};

/*
module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'user',//id
                key: 'id'
            }
        }

    });

    return Tutorial;
};
*/
