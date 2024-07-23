const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure correct path to your configuration file

const Request = sequelize.define('Request', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  status: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Request;
