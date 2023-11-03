const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER, //id set to integer to return numbers in the id column.
      primaryKey: true, // a primary key has been assigned to the id. 
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING, // set the tag_name to string so that we can return product names from the database. 
      allowNull: false,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
