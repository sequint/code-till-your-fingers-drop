const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const pls = require('passport-local-sequelize')

const User = pls.defineUser(sequelize, {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

module.exports = User
