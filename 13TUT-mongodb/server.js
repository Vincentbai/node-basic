require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOption = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const credentials = require('./middleware/credentials')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

const PORT = process.env.PORT || 3500

// connect to mongodb
connectDB()

app.use(logger)

// handle options credentials check - before cors
// and fetch cookies credentials requirement
app.use(credentials)

app.use(cors(corsOption))

app.use(express.urlencoded({extended: false}))

app.use(express.json())

// middleware for cookies
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT) // works like waterfall, everything under this line has to be verified jwt
app.use('/employees', require('./routes/api/employees'))

app.all('*', (req, res)=>{
  res.status(404)
  if(req.accepts('html')){
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  }else if(req.accepts('json')){
    res.json({error: '404 Not Found'})
  }else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

mongoose.connection.once('open', ()=>{
  console.log('Connected to MongoDB!')
  app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))
})