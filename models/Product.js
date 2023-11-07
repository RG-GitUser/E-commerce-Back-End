const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const Category = require('./Category');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER, // setting our data type to integer so that the ID can can come back as a number.
      primaryKey: true, // A primary key exists for this product "id".
      autoIncrement: true, // auto incriment is to "true" in this case so our product ID returns all product categories. 
    },
    product_name: {
      type: DataTypes.STRING,  // setting our data type to string so that we can return data with a series of products
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // here we are setting our decimal point to stay only two decimals after the total number of digits, which in this case is 10. 
      allowNull: false, 
    },
    category_id: { // adding category_id to reference to products
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
