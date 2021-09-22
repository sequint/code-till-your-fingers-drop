const router = require('express').Router()
const { Interest } = require('../models')

// Get all interests.
router.get('/interests', (req, res) => {
  Interest.findAll()
    .then(interests => res.json({
      status: 200,
      interests: interests
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Get specific interest by id.
router.get('/interests/:id', (req, res) => {
  Interest.findAll({
    where: { id: req.params.id }
  })
    .then(interest => res.json({
      status: 200,
      interest: interest
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Create a new interest.
router.post('/interests', (req, res) => {
  Interest.create(req.body)
    .then(interest => res.json({
      status: 200,
      interest: interest
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Update a interest's information.
router.put('/interests/:id', (req, res) => {
  Interest.update(req.body, {
    where: { id: req.params.id }
  })
    .then(interest => res.json({
      status: 200,
      interest: req.body
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Delete a interest.
router.delete('/interests/:id', (req, res) => {
  Interest.destroy({
    where: { id: req.params.id }
  })
    .then(interest => res.json({
      status: 200
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

module.exports = router
