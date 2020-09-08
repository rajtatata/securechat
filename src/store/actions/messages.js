import { SET_MESSAGES, DELETE_MESSAGES, NEW_MESSAGE, SET_DECRYPTED_MESSAGE, DELETE_CHATS } from './actionTypes'

export const setMessages = (messages, contactMessages) => {
    return {
        type: SET_MESSAGES,
        messages: messages,
        contactMessages: contactMessages
    }
}

export const setDecryptedMessage = (messageId, decryptedMessage) => {
    return {
        type: SET_DECRYPTED_MESSAGE,
        messageId: messageId,
        decryptedMessage: decryptedMessage
    }
}

export const newMessage = (message) => {
    return {
        type: NEW_MESSAGE,
        message: message
    }
}

export const deleteMessages = (contactId, messageIds) => {
    return {
        type: DELETE_MESSAGES,
        contactId: contactId,
        messageIds: messageIds
    }
}

export const deleteChats = (contactIds) => {
    return {
        type: DELETE_CHATS,
        contactIds: contactIds
    }
}