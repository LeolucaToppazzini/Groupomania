const db = require("../models");
const User = db.users;
const Tutorial = db.tutorials
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
                const token = jwt.sign({ userId: userExist.user_id }, 'RANDOM_TOKEN_SECRET', { expiresIn: "365d" });
                return res.status(200).json({ userId: userExist.id, Token: token });
               // return res.status(200).json(console.log("user logged"));
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


exports.deleteUser = (req, res) => {
    User.findOne({
        where: { id: req.params.id },
        include: [{ model: Tutorial, as: 'tutorials' }] // Include i tutorial associati all'utente
    })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "Utente non trovato" });
            }

            // Elimina o dissocia i tutorial associati all'utente
            return Promise.all(
                user.tutorials.map((tutorial) => tutorial.destroy())
            )
                .then(() => user.destroy()) // Elimina l'utente dopo aver eliminato i tutorial associati
                .then(() => res.status(200).json({ message: "Utente cancellato" }));
        })
        .catch((error) => res.status(400).json({ error }));
};








/*
exports.deleteUser = (req, res) => {
    User.findOne({
        where: { id: req.params.id },
    })
        .then((User) => {
            User.destroy({ id: req.params.id });
        })
        .then(() => res.status(200).json({ message: "Utente cancellato" }))
        .catch((error) => res.status(400).json({ error }));
};

 */




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