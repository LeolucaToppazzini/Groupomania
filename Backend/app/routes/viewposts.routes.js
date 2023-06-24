const auth = require("../middleware/auth");
const viewposts = require("../controllers/viewpost.controller");

module.exports = app => {
    const viewposts = require("../controllers/viewpost.controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/",auth, viewposts.createViewPost);
    router.get("/",auth, viewposts.getAllViewPost);
    // Delete a Tutorial with id




    app.use('/api/viewposts', router);
};