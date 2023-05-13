
const db = require("../models");
const User = db.users;
const Tutorial = db.tutorials;

module.exports = (sequelize, Sequelize) => {
    const ViewPost = sequelize.define("viewpost", {
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        tutorial_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'tutorials',
                key: 'id'
            }
        }
    });

    ViewPost.associate = function(models) {
        ViewPost.belongsTo(models.user, {
            foreignKey: 'user_id',
            as: 'user'
        });
    },
        ViewPost.associate = function(models) {
            ViewPost.belongsTo(models.tutorials, {
                foreignKey: 'tutorial_id',
                as: 'tutorial'
            });
        };



    /*
    // definizione della relazione many-to-many con il modello User
    ViewPost.belongsTo(User, {
        foreignKey: {

            name: 'user_id',
            allowNull: false
        },
        onDelete: 'CASCADE'
    });

    // definizione della relazione many-to-many con il modello Tutorial
    ViewPost.belongsTo(Tutorial, {
        foreignKey: {

            name: 'tutorial_id',
            allowNull: false
        },
        onDelete: 'CASCADE'
    });
*/
    return ViewPost;
};




/*
const db = require("../models");
const User = db.users;
const Tutorial = db.tutorials;


module.exports = (sequelize, Sequelize) => {
    const ViewPost = sequelize.define("viewpost", {



    });

    // definizione della relazione many-to-many con il modello User
    ViewPost.belongsTo(sequelize.models.User, {
        foreignKey: 'userId',
        as: 'user'
    });

    // definizione della relazione many-to-many con il modello Tutorial
    ViewPost.belongsTo(sequelize.models.Tutorial, {
        foreignKey: 'tutorialId',
        as: 'tutorial'
    });

    return ViewPost;
};

 */


/*
id: {
    type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
}

 */