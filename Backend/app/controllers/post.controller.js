const db = require("../models");
const Post = db.post;
const Op = db.Sequelize.Op;

exports.createPost = async (req, res) => {
    try {
        const imageUrl = req.file ? `${req.file.filename}` : null;
        const userId = req.user_id;
        const userExist = await db.User.findOne({ where: { user_id: userId } });
        if (userExist) {
            await db.Post.create({
                post_content: req.body.content,
                post_image_url: imageUrl,
                user_id: userId,
            });
            return res.status(201).json({ message: "post pubblicato" });
        } else {
            return res.status(404).json({ error: "utente non trovato" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};