const Message = require('../../models/message')

exports.getMessageById = async _id => {
    return await Message.findById(_id)
}

exports.getMessages = async filters => {
    return await Message.find(filters)
}

exports.createMessage = async ({ to, message, nonce, from }) => {
    return await Message.create({
        to,
        message,
        nonce,
        from
    })
}

exports.deleteMessage = async _id => {
    return await Message.deleteOne({ _id })
}

exports.deleteMessages = async userId => {
    return await Message.deleteMany({ to: userId })
}