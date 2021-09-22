const router = require('express').Router()
const { User } = require('../models')

// Get all users.
router.get('/users', (req, res) => {
  User.findAll()
    .then(users => res.json({
      status: 200,
      users: users
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Get specific user by id.
router.get('/users/:id', (req, res) => {
  User.findAll({
    where: { id: req.params.id }
  })
    .then(user => res.json({
      status: 200,
      user: user
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Create a new user.
router.post('/users', (req, res) => {
  User.create(req.body)
    .then(user => res.json({
      status: 200,
      user: user
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Update a user's information.
router.put('/users/:id', (req, res) => {
  User.update(req.body, {
    where: { id: req.params.id }
  })
    .then(user => res.json({
      status: 200,
      user: req.body
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Delete a user.
router.delete('/users/:id', (req, res) => {
  User.destroy({
    where: { id: req.params.id }
  })
    .then(user => res.json({
      status: 200
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

module.exports = router
