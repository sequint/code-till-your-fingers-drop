const sequelize = require('./config/connection')
const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { User } = require('./models')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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
}, ({ id }, cb) => User.findOne({ where: { id } })
  .then(user => cb(null, user))
  .catch(err => cb(err, null))))

app.use(require('./routes'))

// sync sequelize models to the database, then turn on the server
sequelize.sync({})
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err))
