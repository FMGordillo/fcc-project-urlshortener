const { Sequelize } = require('sequelize')

// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite

module.exports = sequelize
