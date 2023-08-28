const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const CategoryModel = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'categories',
    timestamps: false,
  })

  // CategoryModel.associate = (models) => {
  //   CategoryModel.hasMany(models.Comment, {foreignKey: 'accountId', as: 'comments'})
  // }

  return CategoryModel
}  