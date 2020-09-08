const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
    expoPushToken: {
        type: String,
        default: 'none'
    },
    acceptNotifications: {
        type: Boolean,
        default: true
    },
    installationId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', messageSchema)