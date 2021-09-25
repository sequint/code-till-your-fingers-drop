const router = require('express').Router()
const { Task } = require('../models')

// Get all task.
router.get('/tasks', (req, res) => {
  Task.findAll()
    .then(tasks => res.json({
      status: 200,
      tasks: tasks
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Get specific task by project id.
router.get('/tasks/:id', (req, res) => {
  Task.findAll({
    where: { projectId: req.params.id }
  })
    .then(task => res.json({
      status: 200,
      task: task
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Create a new tasks.
router.post('/tasks', (req, res) => {
  Task.create(req.body)
    .then(task => res.json({
      status: 200,
      task: task
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Update a task's information.
router.put('/tasks/:id', (req, res) => {
  Task.update(req.body, {
    where: { id: req.params.id }
  })
    .then(task => res.json({
      status: 200,
      task: req.body
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Delete a task.
router.delete('/tasks/:id', (req, res) => {
  Task.destroy({
    where: { id: req.params.id }
  })
    .then(task => res.json({
      status: 200
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

module.exports = router
