module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        mail: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};