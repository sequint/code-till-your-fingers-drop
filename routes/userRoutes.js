const router = require('express').Router()
const { User } = require('../models')

// Get route
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

module.exports = router
