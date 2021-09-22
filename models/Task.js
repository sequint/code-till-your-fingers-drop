const { Model, DataTypes } = require('sequelize')
const { Project } = require('./')
const sequelize = require('../config/connection')

class Task extends Model {}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, { sequelize, modelName: 'task' })

module.exports = Task
