const User = require('../models/user')

exports.authenticate = async (req, res, next) => {
    // read these from header
    const userId = req.get('userId')
    const installationId = req.get('installationId')

    if (userId && installationId) {
        const u = await User.findById(userId)
        if (u && u.installationId === installationId) {
            req.body.isAuthenticated = true
            req.body.userId = userId
        } else {
            req.body.isAuthenticated = false
        }
    } else {
        req.body.isAuthenticated = false
    }

    return next()
}