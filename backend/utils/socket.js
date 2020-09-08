const { getSubscriber, publishMessage } = require('./redis')
const messageDataService = require('../services/database/message')
const userDataService = require('../services/database/user')
const { sendPushNotification } = require('./pushNotifications')

exports.onConnect = socket => {
    let subscriber
    let userId

    // initial message to identify user id
    socket.on('initialComm', async id => {
        userId = id
        subscriber = getSubscriber(userId) // redis subscriber on a channel = `#userId`

        // subscriber event for new messages to our user
        subscriber.on('message', (channel, message) => {
            socket.emit('newMessage', message)
        })

        // send new messages on first connect
        const newMessages = await messageDataService.getMessages({ to: id })
        socket.emit('newMessages', JSON.stringify(newMessages))
    })

    // socket event when user wants to send new message
    socket.on('sendMessage', async m => {
        const { to, message, nonce } = JSON.parse(m)
        const newMessage = await messageDataService.createMessage({ to, message, nonce, from: userId })
        publishMessage(to, JSON.stringify(newMessage)) // publish this message to the channel of the receiver (`#to`)
        const u = await userDataService.getUser(to)

        if (u.expoPushToken !== 'none' && u.acceptNotifications) {
            await sendPushNotification({
                to: u.expoPushToken,
                title: `You have new messages!`,
                body: `Check your app`,
            })
        }
    })

    // garbage collection on disconnect
    socket.on('disconnect', () => {
        if (subscriber) {
            subscriber.unsubscribe()
            subscriber.quit()
        }
    })
}