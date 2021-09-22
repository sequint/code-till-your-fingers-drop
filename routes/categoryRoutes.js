const router = require('express').Router()
const { Category } = require('../models')

// Get route - retrieves category data from the database and sends back to front-end.
router.get('/categories', (req, res) => {
  Category.findAll()
    .then(categories => res.json(
      {
        status: 200,
        categories: categories
      }
    ))
    .catch(err => res.json(
      {
        status: 400,
        err: err
      }
    ))
})

// Get by id route - retreives one data by it's id from the front-end.
router.get('/categories/:id', (req, res) => {
  // Get the category who's id matches the parameter id passed in.
  Category.findAll({
    include: product,
    where: { id: req.params.id }
  })
    .then(category => res.json(
      {
        status: 200,
        category: category
      }
    ))
    .catch(err => res.json(
      {
        status: 400,
        err: err
      }
    ))
})

// Post route - receives new category data from the front-end and creates new row in the database.

// Put route - receives category data from front-end and updates the row in the database with a matching id.

// Delete route - receives a category id from the front-end and deletes the matching row in the database.

// Export all routes using router variable.
module.exports = router
