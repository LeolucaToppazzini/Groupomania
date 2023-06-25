const auth = require("../middleware/auth");
const tutorials = require("../controllers/tutorial.controller");

module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    const multer = require('../middleware/multerConfig')
    const auth = require('../middleware/auth')
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/",auth,multer, tutorials.create);
    // Delete a Tutorial with id
    router.delete("/:id",auth, tutorials.delete);
    // Retrieve all Tutorials
    router.get("/",auth, tutorials.getAllTutorials);
    router.put("/:id",auth, tutorials.modifyTutorial);



    app.use('/api/tutorials', router);
};