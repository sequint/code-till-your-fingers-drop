// Imports
const { Sequelize } = require('sequelize')
require('dotenv').config()

// Export a new sequelize database connection.
// Use jaws database url for connection if it's available.
// If jaws is not available, use local db URL path.
module.exports = new Sequelize(process.env.JAWSDB_URL || `mysql://root:${process.env.PASSWORD}@localhost:3306/codefingers.db`)
