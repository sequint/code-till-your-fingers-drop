const router = require('express').Router()
const { Track } = require('../models')

// Get all track.
router.get('/tracks', (req, res) => {
  Track.findAll()
    .then(tracks => res.json({
      status: 200,
      tracks: tracks
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Get specific track by id.
router.get('/tracks/:id', (req, res) => {
  Track.findAll({
    where: { id: req.params.id }
  })
    .then(track => res.json({
      status: 200,
      track: track
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Create a new tracks.
router.post('/tracks', (req, res) => {
  Track.create(req.body)
    .then(track => res.json({
      status: 200,
      track: track
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Update a track's information.
router.put('/tracks/:id', (req, res) => {
  Track.update(req.body, {
    where: { id: req.params.id }
  })
    .then(track => res.json({
      status: 200,
      track: req.body
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Delete a track.
router.delete('/tracks/:id', (req, res) => {
  Track.destroy({
    where: { id: req.params.id }
  })
    .then(track => res.json({
      status: 200
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

module.exports = router
