// Import .env library for passwords.
require('dotenv').config()

// Import node packages required for project.
const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { User, Post } = require('./models')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

// Name app variable to hold express router functions.
const app = express()

// Use express to join public folder with the server.
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
// Use json with express routes in order to recieve and send data.
app.use(express.json())

// Initialize passport for encyption of password and user tokens.
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Get the token of the user from localStorage, then sign in user if it is available.
// Join user id with post.
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findOne({ where: { id }, include: [Post] })
  .then(user => cb(null, user))
  .catch(err => cb(err, null))))

// Use and import routes folder.
app.use(require('./routes'))

// Sync the database then turning on our server.
require('./db')
  .sync()
  .then(() => app.listen(process.env.PORT || 3000))
  