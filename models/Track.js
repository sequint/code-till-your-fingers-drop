const { Model, DataTypes } = require('sequelize')
const { User, Project } = require('./')
const sequelize = require('../config/connection')

class Track extends Model {}

Track.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
}, { sequelize, modelName: 'track' })

module.exports = Track
