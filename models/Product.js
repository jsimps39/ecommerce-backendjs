// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
  },
  product_name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    IS_DECIMAL: true
    //NEED TO VALIDATE THAT THE VALUE IS A DECIMAL
},
stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 10,
    //VALIDATE THAT VALUE IS NUMERIC
},
category_id: {
  type: DataTypes.INTEGER,
  references: {
    model: 'category',
    key: 'id',
    unique: false,
}
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
