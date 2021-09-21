const { Model, DataTypes } = require('sequelize')
const { User } = require('./')
const sequelize = require('../db')

class Interest extends Model {}

Interest.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  interest_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, { sequelize, modelName: 'interest' })

module.exports = Interest