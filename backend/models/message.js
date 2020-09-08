const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        required: true
    },
    nonce: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Message', messageSchema)