const { Model, DataTypes } = require('sequelize')
const { Category } = require('./')
const sequelize = require('../db')

class User extends Model {}

User.init({
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
}, { sequelize, modelName: 'user'})

module.exports = User