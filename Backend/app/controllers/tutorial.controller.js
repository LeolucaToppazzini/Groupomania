const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;





exports.create = async (req, res) => {
    try {
        const url = req.protocol + '://' + req.get('host');


        const userExist = await db.users.findOne({ where: { id: req.body.user_id } });
        if (userExist) {
            await db.tutorials.create({
                //userId: req.body.user_id,
                title: req.body.title,
                description: req.body.description,
                image_url: url + '/images/' + req.file.filename,
                user_id: req.body.user_id
            });
            return res.status(201).json({ message: "post pubblicato" });
        } else {
            return res.status(404).json({ error: "utente non trovato" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



/*
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const tutorial = {
        userId: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };





    // Save Tutorial in the database
    Tutorial.create(tutorial)
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


exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};


exports.getAllTutorials = async (req, res) => {
    try {
        const tutorials = await db.tutorials.findAll({
            attributes: ["id", "title", "image_url", "createdAt"],
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: db.users,
                    attributes: ["id", "email"]

                },
            ],
            where: { user_id: db.users.id },
        });
        res.status(200).json(tutorials);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
