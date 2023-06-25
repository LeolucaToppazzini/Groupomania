require("dotenv").config()

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: process.env["MY_SQL_PASSWORD"],
    DB: "groupmania",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};