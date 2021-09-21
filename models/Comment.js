const { Model, DataTypes } = require('sequelize')
const { Task, User } = require('./')
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
    allowNull: false
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Task,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, { sequelize, modelName: 'comment'})

module.exports = Comment
