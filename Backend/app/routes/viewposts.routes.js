const auth = require("../middleware/auth");

module.exports = app => {
    const viewposts = require("../controllers/viewpost.controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/",auth, viewposts.createViewPost);
    // Delete a Tutorial with id




    app.use('/api/viewposts', router);
};