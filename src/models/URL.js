const { DataTypes } = require('sequelize/types')
const sequelize = require('../utils/db')

const URLModel = sequelize.define('URL', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
})

module.exports = URLModel
