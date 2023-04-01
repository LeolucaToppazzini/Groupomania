const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

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