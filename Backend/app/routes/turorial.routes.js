module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    const multer = require('../middleware/multerConfig')
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/",multer, tutorials.create);
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
    // Retrieve all Tutorials
    router.get("/", tutorials.getAllPosts);



    app.use('/api/tutorials', router);
};