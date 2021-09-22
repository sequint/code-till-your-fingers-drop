const { Model, DataTypes } = require('sequelize')
const { User } = require('./')
const sequelize = require('../config/connection')

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
  }
}, { sequelize, modelName: 'interest' })

module.exports = Interest
