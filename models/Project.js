const { Model, DataTypes } = require('sequelize')
const { Category } = require('./')
const sequelize = require('../db')

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
  categoryId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, { sequelize, modelName: project })

module.exports = Project
