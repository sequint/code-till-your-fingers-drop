require('dotenv').config()

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.JAWSDB_URL || `mysql://root:${process.env.PASSWORD}@localhost:3306/codefingers_db`)

module.exports = sequelize
