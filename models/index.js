// Import all models from the folder in order to export them from one file.
const Category = require('./Category')
const Comment = require('./Comment')
const Interest = require('./Interest')
const Project = require('./Project')
const Task = require('./Task')
const User = require('./User')

// Join parent tables with child tables on the child tables foreign key.
Category.hasMany(Project, { foreignKey: 'categoryId'})
Project.belongsTo(Category, { foreignKey: 'categoryId' })

User.hasMany(Project, { foreignKey: 'userId' })
Project.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Interest, { foreignKey: 'userId' })
Interest.belongsTo(User, { foreignKey: 'userId'})

User.hasMany(Comment, { foreignKey: 'commentorId' })
Comment.belongsTo(User, { foreignKey: 'commentorId' })

Project.hasMany(Task, { foreignKey: 'projectId' })
Task.belongsTo(Project, { foreignKey: 'projectId' })

// Export all models in an object.
module.exports = {
  Category,
  Comment,
  Interest,
  Project,
  Task,
  User
}