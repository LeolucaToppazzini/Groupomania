const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ViewPosts extends Model {
        static associate(models) {
            models.ViewPosts.belongsTo(models.User, { foreignKey: "user_id", onDelete: "CASCADE" });
            models.ViewPosts.belongsTo(models.Post, { foreignKey: "post_id", onDelete: "CASCADE" });
        }
    }
    ViewPosts.init(
        {
            viewposts_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
            user_id: { type: DataTypes.INTEGER, allowNull: false },
            post_id: { type: DataTypes.INTEGER, allowNull: false },
        },
        { timestamps: false, sequelize, modelName: "ViewPosts" }
    );
    return ViewPosts;
};
