const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')

const URLModel = sequelize.define('URL', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
})

// TODO: Improve this
sequelize.sync()

module.exports = URLModel
