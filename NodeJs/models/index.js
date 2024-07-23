const sequelize = require('../config/database'); // Ensure correct path to your configuration file

// Define your models
const Request = require('./Request');
const Product = require('./Product');

// Define associations if necessary
Request.hasMany(Product, { foreignKey: 'requestId' });
Product.belongsTo(Request, { foreignKey: 'requestId' });

// Sync the models with the database
sequelize.sync();

module.exports = {
  sequelize,
  Request,
  Product,
};
