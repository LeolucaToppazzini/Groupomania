const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.mail) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = {
        mail: req.body.mail,
        password: req.body.password,

    };


    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};
