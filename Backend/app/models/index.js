const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;






db.users = require("./user.model")(sequelize, Sequelize);
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

db.viewpost = require("./viewposts.model")(sequelize, Sequelize);


// Associazione tra User e Tutorial
db.users.hasMany(db.tutorials, { foreignKey: 'user_id', as: 'tutorials' });
db.tutorials.belongsTo(db.users, { foreignKey: 'user_id', as: 'user' });

// Associazione tra User e Viewpost
db.users.hasMany(db.viewpost, { foreignKey: 'user_id', as: 'viewposts' });
db.viewpost.belongsTo(db.users, { foreignKey: 'user_id', as: 'user' });


module.exports = db;