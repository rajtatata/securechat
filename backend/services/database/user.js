const User = require('../../models/user')

exports.createUser = async ({ expoPushToken, installationId }) => {
    return await User.create({
        expoPushToken: expoPushToken || 'none',
        installationId
    })
}

exports.deleteUser = async (_id) => {
    await User.deleteOne({ _id })
}

exports.getUser = async _id => {
    return await User.findById(_id)
}