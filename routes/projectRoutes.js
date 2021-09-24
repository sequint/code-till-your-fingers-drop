const router = require('express').Router()
const { Project } = require('../models')
const passport = require('passport')

// Get specific project by id.
router.get('/projects', passport.authenticate('jwt'), (req, res) => {
  console.log('In route')
  Project.findAll({
    where: { id: req.user.id }
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
    startDate: req.body.description,
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
