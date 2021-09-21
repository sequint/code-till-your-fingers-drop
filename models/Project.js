const { Model, DataTypes } = require('sequelize')
const { User, Category } = require('./')
const sequelize = require('../config/connection')

class Project extends Model {}

// Create a date variable using day, month, and year joined in a string.
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

// Re-assign today to be full date.
today = mm + '/' + dd + '/' + yyyy;

Project.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: today
  },
  percentComplete: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, { sequelize, modelName: 'project' })

module.exports = Project
