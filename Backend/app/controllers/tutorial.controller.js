const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;





exports.create = async (req, res) => {
    try {
        //const imageUrl = req.file ? `${req.file.filename}` : null;
        //const userId = req.user_id;
        const userExist = await db.users.findOne({ where: { id: req.body.user_id } });
        if (userExist) {
            await db.tutorials.create({
                //userId: req.body.user_id,
                title: req.body.title,
                description: req.body.description,

                //post_content: req.body.content,
                //post_image_url: imageUrl,
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

exports.findAll = (req, res) => {
    const title = req.query.title;


    Tutorial.findAll({ where: {} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};