import nacl from 'tweet-nacl-react-native-expo'

export const messageType = {
    sent: 0,
    received: 1
}

export const parseMessages = (messages) => {
    const messageArray = {}
    const contactMessages = {}

    messages.forEach(m => {
        const message = {
            message: m.message,
            messageNonce: nacl.util.decodeBase64(m.message_nonce),
            messageType: m.message_type,
            timestamp: m.timestamp,
            decryptedMessage: null
        }

        messageArray[m.id] = message

        if (contactMessages[m.contact_id]) {
            contactMessages[m.contact_id].push(m.id)
        } else {
            contactMessages[m.contact_id] = [m.id]
        }
        
    })

    return { messageArray, contactMessages }
}

export const parseNewMessage = ({ contactId, message, messageNonce, timestamp, messageType, messageId }) => {
    return {
        id: messageId,
        contactId: contactId,
        message: message,
        messageNonce: nacl.util.decodeBase64(messageNonce),
        messageType: messageType,
        timestamp: timestamp,
        decryptedMessage: null
    }
}