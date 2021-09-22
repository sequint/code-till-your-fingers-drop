const router = require('express').Router()
const { Project } = require('../models')

// Get all projects.
router.get('/projects', (req, res) => {
  Project.findAll()
    .then(projects => res.json({
      status: 200,
      projects: projects
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Get specific project by id.
router.get('/projects/:id', (req, res) => {
  Project.findAll({
    where: { id: req.params.id }
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
router.post('/projects', (req, res) => {
  Project.create(req.body)
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
router.put('/projects/:id', (req, res) => {
  Project.update(req.body, {
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
