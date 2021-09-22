const router = require('express').Router()
const { Comment } = require('../models')

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
    where: { id: req.params.id }
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
router.post('/comments', (req, res) => {
  Comment.create(req.body)
    .then(task => res.json({
      status: 200,
      comment: comment
    }))
    .catch(err => res.json({
      status: 400,
      err: err
    }))
})

// Update a Comment's information.
router.put('/comment/:id', (req, res) => {
  comment.update(req.body, {
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
router.delete('/comment/:id', (req, res) => {
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
