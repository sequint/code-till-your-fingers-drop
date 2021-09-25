const router = require('express').Router()
const { Track } = require('../models')
const passport = require('passport')

// Get all track.
router.get('/tracks', passport.authenticate('jwt'), (req, res) => {
  Track.findAll({
    where: { userId: req.user.id }
  })
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

// Create a new tracks with project id and user id.
router.post('/tracks/', passport.authenticate('jwt'), (req, res) => {
  Track.create({
    userId: req.user.id,
    projectId: req.body.projectId
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
