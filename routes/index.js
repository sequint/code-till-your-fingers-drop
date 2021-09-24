// Declare a router variable to use express routing.
const router = require('express').Router()

// Declare end points for api routes.
router.use('/api', require('./categoryRoutes'))
router.use('/api', require('./commentRoutes'))
router.use('/api', require('./interestRoutes'))
router.use('/api', require('./projectRoutes'))
router.use('/api', require('./taskRoutes'))
router.use('/api', require('./userRoutes'))
router.use('/api', require('./trackRoutes'))

// Export the router file to use elsewhere as 'router'.
module.exports = router
