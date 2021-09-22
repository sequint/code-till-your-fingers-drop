const { Model, DataTypes } = require('sequelize')
const { Task, User } = require('./')
const sequelize = require('../config/connection')

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'comment'})

module.exports = Comment
