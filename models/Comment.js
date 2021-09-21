const { Model, DataTypes } = require('sequelize')
const { Task } = require('./')
const sequelize = require('../db')

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
    allowNull: true
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Task,
      key: 'id'
    }
  }
}, { sequelize, modelName: 'comment'})

module.exports = Comment
