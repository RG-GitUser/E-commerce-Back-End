const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,  //Here we are defning the "id" section of the column. In this case, the "id" is an integer. 
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,  //Here we have defined the "category_name" column to recognize lines of string. 
      allowNull: false,
    },
  },
  {
    sequelize, 
    timestamps: false, 
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);


module.exports = Category;
