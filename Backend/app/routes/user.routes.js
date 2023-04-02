
module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new user
    router.post("/", users.create);
    // Delete a Tutorial with id
    //router.delete("/:id", tutorials.delete);
    // Retrieve all Tutorials
    //router.get("/", tutorials.findAll);



    app.use('/api/users', router);
};