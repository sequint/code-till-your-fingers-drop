const router = require('express').Router()
const { Project } = require('../models')
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

// Create a new project.
router.post('/projects', passport.authenticate('jwt'), (req, res) => {
  Project.create({
    projectName: req.body.projectName,
    description: req.body.description,
    startDate: req.body.startDate,
    userId: req.user.id
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
