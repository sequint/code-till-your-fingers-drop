const router = require('express').Router()
const { Comment } = require('../models')
const passport = require('passport')

// Get all Comments.
router.get('/comments', (req, res) => {
  Comment.findAll()
    .then(comments => res.json({
      status: 200,
      comments: comments
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Get specific comments by id.
router.get('/comments/:id', (req, res) => {
  Comment.findAll({
    where: { projectId: req.params.id }
  })
    .then(comment => res.json({
      status: 200,
      comment: comment
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Create a new comment.
router.post('/comments', passport.authenticate('jwt'), (req, res) => {
  Comment.create({
    content: req.body.content,
    commentorId: req.user.id,
    projectId: req.body.projectId
  })
    .then(comment => res.json({
      status: 200,
      comment: comment
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Update a Comment's information.
router.put('/comments/:id', (req, res) => {
  Comment.update(req.body, {
    where: { id: req.params.id }
  })
    .then(comment => res.json({
      status: 200,
      comment: req.body
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Delete a comments.
router.delete('/comments/:id', (req, res) => {
  Comment.destroy({
    where: { id: req.params.id }
  })
    .then(comment => res.json({
      status: 200
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

module.exports = router
