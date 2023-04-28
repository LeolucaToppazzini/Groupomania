const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User added successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );
};


exports.login = async (req, res) => {
    try {
        const userExist = await User.findOne({ where: { email: req.body.email } });
        if (userExist) {
            const passwordIsValid = await bcrypt.compareSync(req.body.password, userExist.password);
            if (passwordIsValid) {

                return res.status(200).json(console.log("user logged"));
            } else {
                return res.status(401).json({ error: "password incorrect" });
            }
        } else {
            return res.status(404).json({ error: "email incorrect" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



/*
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
*/