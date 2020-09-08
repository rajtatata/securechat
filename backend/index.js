const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { onConnect } = require('./utils/socket')

// read .env vars 
require('dotenv').config()

// routers
const messageRouter = require('./routers/message')
const userRouter = require('./routers/user')

// middlewares
const authMiddleware = require('./middlewares/auth')

const app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.use(cors())
app.use(express.json())
app.use(authMiddleware.authenticate)

app.use('/message', messageRouter)
app.use('/user', userRouter)

// socket connection
io.on('connection', onConnect)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }
).then((d) => {
    http.listen(process.env.SERVER_PORT, () => console.log(`Example app listening on port ${process.env.SERVER_PORT}!`))
}).catch(err => {
    console.log(err)
})