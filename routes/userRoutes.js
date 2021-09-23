const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  User.register(new User({ 
    username: req.body.username,
    email: req.body.email,
    age: req.body.age
  }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : console.log('Not a user.'))
  })
})

router.get('/users/projects', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

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
