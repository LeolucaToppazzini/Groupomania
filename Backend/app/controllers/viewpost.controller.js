const db = require("../models");

exports.createViewPost = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const tutorialId = req.body.tutorial_id;
        const userExist = await db.users.findOne({ where: { id: req.body.user_id } });
        const postExist = await db.tutorials.findOne({ where: { id: req.body.tutorial_id } });

        if (postExist) {
            if (userExist) {
                await db.viewpost.create({

                    tutorial_id: tutorialId,
                    user_id: userId,
                });
                return res.status(201).json({ message: "Il post è stato visualizzato" });
            } else {
                return res.status(404).json({ error: "utente non trovato" });
            }
        } else {
            return res.status(404).json({ error: "post non trovato" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getAllViewPost = async (req, res) => {
    try {
        const viewposts = await db.viewpost.findAll({
            attributes: ["id", "user_id" ,"tutorial_id",  "createdAt"],
            order: [["createdAt", "DESC"]],

            where: { /*user_id: db.users.id */},
        });
        res.status(200).json(viewposts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};