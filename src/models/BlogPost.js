const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
  })

  BlogPostModel.associate = (models) => {
    BlogPostModel.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
  }

  return BlogPostModel
}