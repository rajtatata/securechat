const Joi = require('@hapi/joi')

const userDataService = require('../services/database/user')
const messageDataService = require('../services/database/message')
const { getRandomAvatar, avatarThumbnails } = require('../utils/avatar')

exports.signup = async (req, res) => {
    const { expoPushToken, installationId } = req.body

    const schema = Joi.object({
        expoPushToken: Joi.string(),
        installationId: Joi.string().required(),
    })

    const valid = schema.validate({ expoPushToken, installationId })

    if (valid.error) {
        return res.status(200).send({
            status: 0,
            error: valid.error.message
        })
    }

    const u = await userDataService.createUser({
        expoPushToken,
        installationId
    })

    return res.status(200).send({
        status: 1,
        user: u.toJSON()
    })
}

exports.randomAvatar = async (req, res) => {
    return res.status(200).send({
        status: 1,
        avatar: getRandomAvatar()
    })
}

exports.getAvatarThumbnails = async (req, res) => {
    return res.status(200).send({
        status: 1,
        avatars: avatarThumbnails
    })
}

exports.resetApp = async (req, res) => {
    const { isAuthenticated, userId } = req.body

    if (!isAuthenticated) {
        return res.status(200).send({
            status: 0,
            error: 'Unauthorized!'
        })
    }

    await userDataService.deleteUser(userId)
    await messageDataService.deleteMessages(userId)

    return res.status(200).send({
        status: 1
    })
}

exports.updateNotifications = async (req, res) => {
    const { isAuthenticated, userId, acceptNotifications } = req.body

    if (!isAuthenticated) {
        return res.status(200).send({
            status: 0,
            error: 'Unauthorized!'
        })
    }

    const schema = Joi.object({
        acceptNotifications: Joi.bool().required(),
    })

    const valid = schema.validate({ acceptNotifications })

    if (valid.error) {
        return res.status(200).send({
            status: 0,
            error: valid.error.message
        })
    }

    const u = await userDataService.getUser(userId)
    u.acceptNotifications = acceptNotifications
    await u.save()

    return res.status(200).send({
        status: 1
    })
}