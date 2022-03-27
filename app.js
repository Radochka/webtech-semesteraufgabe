const express = require('express')
const bodyParser = require('body-parser') //parsed die Daten
const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const app = express()

const authRoutes = require('./routes/auth')
//const userRoutes = require('./routes/user')
const wishlistRoutes = require('./routes/wishlist')
const positionRoutes = require('./routes/position')


mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))


app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

//localhost:5000/api/auth/login
app.use('/api/auth', authRoutes)
//app.use('/api/user', userRoutes)
app.use('/api/wunschlisten', wishlistRoutes)
app.use('/api/position', positionRoutes)

module.exports = app