const Joi = require('@hapi/joi')

const messageDataService = require('../services/database/message')

exports.deleteMessage = async (req, res) => {
    const { isAuthenticated, userId, messageIds } = req.body
    if (!isAuthenticated) {
        return res.status(200).send({
            status: 0,
            error: 'Unauthorized!'
        })
    }

    const schema = Joi.object({
        messageIds: Joi.array().items(Joi.string()).required()
    })

    const valid = schema.validate({ messageIds })

    if (valid.error) {
        return res.status(200).send({
            status: 0,
            error: valid.error.message
        })
    }

    for (let i = 0; i < messageIds.length; i++) {
        const m = await messageDataService.getMessageById(messageIds[i])
        if (m && m.to === userId) {
            await messageDataService.deleteMessage(messageIds[i])
        }
    }

    return res.status(200).send({
        status: 1
    })
}