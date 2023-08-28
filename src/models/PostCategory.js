const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const PostCategoryModel = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'blog_posts',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'categories',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  })

  PostCategoryModel.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {through:PostCategoryModel, foreignKey: 'postId', otherKey: 'categoryId', as: 'categories'})
    models.Category.belongsToMany(models.BlogPost, {through:PostCategoryModel, foreignKey: 'categoryId', otherKey: 'postId', as: 'posts'})
  }

  return PostCategoryModel
}