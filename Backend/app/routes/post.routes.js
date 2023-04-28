const posts = require("../controllers/post.controller");

module.exports = app => {
    const posts = require("../controllers/post.controller");
    const multer = require("../middleware/multerConfig");

    var router = require("express").Router();

    // Create a new post
    //router.post("/", posts.createPost);
    router.post("/", multer, posts.createPost);

    app.use('/api/posts', router);
}