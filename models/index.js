// Import all models from the folder in order to export them from one file.
const Category = require('./Category')
const Comment = require('./Comment')
const Interest = require('./Interest')
const Project = require('./Project')
const Task = require('./Task')
const User = require('./User')

// Join tables with a foreignKey value.


// Export all models in an object.
module.exports = {
  Category,
  Comment,
  Interest,
  Project,
  Task,
  User
}