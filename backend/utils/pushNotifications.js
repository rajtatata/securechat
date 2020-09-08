const axios = require('axios')

exports.sendPushNotification = async ({ to, title, body, data }) => {
    await axios.post('https://exp.host/--/api/v2/push/send',
        { to, title, body, data }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
}