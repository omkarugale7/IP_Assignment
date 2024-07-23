const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure correct path to your configuration file

const Product = sequelize.define('Product', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  requestId: { type: DataTypes.UUID, allowNull: false },
  serialNumber: { type: DataTypes.INTEGER, allowNull: false },
  productName: { type: DataTypes.STRING, allowNull: false },
  inputImageUrls: { type: DataTypes.TEXT, allowNull: false },
  outputImageUrls: { type: DataTypes.TEXT },
});

module.exports = Product;
