const express = require('express')
const router = express.Router()

const { deleteMessage } = require('../controllers/message')

router.post('/delete', deleteMessage)

module.exports = router