const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      allowNull: false,
      unique: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      unique: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: true,
      unique: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  })

  // UserModel.associate = (models) => {
  //   UserModel.hasMany(models.Comment, {foreignKey: 'accountId', as: 'comments'})
  // }

  return UserModel
}