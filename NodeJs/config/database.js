const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('image_processing', 'postgres', 'newPassword', {
  host: 'localhost',
  dialect: 'postgres', // Ensure the dialect is correctly specified as 'postgres'
  logging: false, // disable logging; default: console.log
});

module.exports = sequelize;
