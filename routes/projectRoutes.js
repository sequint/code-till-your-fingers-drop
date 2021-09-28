const router = require('express').Router()
const { Project, Category, Task } = require('../models')
const passport = require('passport')

// Get specific project by user id.
router.get('/projects', passport.authenticate('jwt'), (req, res) => {
  Project.findAll({
    where: { userId: req.user.id }
  })
    .then(project => res.json({
      status: 200,
      project: project
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Get specific project by category id.
router.get('/projects/searchProjectId/:projectId', (req, res) => {
  Project.findAll({
    where: { id: req.params.projectId }
  })
    .then(project => res.json({
      status: 200,
      project: project
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Get specific project by category id.
router.get('/projects/searchCategoryId/:categoryId', (req, res) => {
  Project.findAll({
    where: { categoryId: req.params.categoryId }
  })
    .then(project => res.json({
      status: 200,
      project: project
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Create a new project with a new category.
router.post('/projects', passport.authenticate('jwt'), (req, res) => {

  Category.findAll({
    where: { title: req.body.categoryTitle }
  })
   .then(category => {

    if (category.length === 0) {
      // Create the new category.
      Category.create({
        title: req.body.categoryTitle
      })
        .then(category => {

          // Create a project with the category id.
          Project.create({
            projectName: req.body.projectName,
            description: req.body.description,
            startDate: req.body.startDate,
            userId: req.user.id,
            categoryId: category.id
          })
            .then(project => {

              // Iterate through the incoming task array and create each to task associated to the project.
              req.body.tasks.forEach(task => {

                Task.create({
                  taskDescription: task.taskDescription,
                  isComplete: task.isComplete,
                  projectId: project.id
                })
                  .then(task => res.json({
                    status: 200,
                    category: category,
                    project: project,
                    task: task
                  }))
                  .catch(err => res.json({
                    status: 400,
                    err: err
                  }))

              })

            })
            .catch(err => res.json({
              status: 400,
              err: err
            }))

        })
        .catch(err => res.json({
          status: 400,
          err: err
        }))
    }
    else {

      // Create a project with the category id.
      Project.create({
        projectName: req.body.projectName,
        description: req.body.description,
        startDate: req.body.startDate,
        userId: req.user.id,
        categoryId: category[0].id
      })
        .then(project => {

          // Iterate through the incoming task array and create each to task associated to the project.
          req.body.tasks.forEach(task => {

            Task.create({
              taskDescription: task.taskDescription,
              isComplete: task.isComplete,
              projectId: project.id
            })
              .then(task => res.json({
                status: 200,
                category: category,
                project: project,
                task: task
              }))
              .catch(err => res.json({
                status: 400,
                err: 'Task error'
              }))

          })

        })
        .catch(err => res.json({
          status: 400,
          err: 'Project error'
        }))
    }

  })
  .catch(err => res.json({
    status: 400,
    err: 'Find match error'
  }))

})

// Update a project's information.
router.put('/projects/:id', passport.authenticate('jwt'), (req, res) => {
  Project.update({
    projectName: req.body.projectName,
    description: req.body.description,
    startDate: req.body.startDate,
    percentComplete: req.body.percentComplete,
    userId: req.user.id,
    categoryId: req.body.categoryId
  }, {
    where: { id: req.params.id }
  })
    .then(project => res.json({
      status: 200,
      project: req.body
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Delete a project.
router.delete('/projects/:id', (req, res) => {
  Project.destroy({
    where: { id: req.params.id }
  })
    .then(project => res.json({
      status: 200
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

module.exports = router
