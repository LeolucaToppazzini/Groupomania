module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tutorials.create);
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);



    app.use('/api/tutorials', router);
};