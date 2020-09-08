import { SET_CHATS_TO_DELETE, SET_CONTACTS_TO_DELETE, SET_MESSAGES_TO_DELETE } from './actionTypes'

export const setChatsToDelete = chatIds => {
    return {
        type: SET_CHATS_TO_DELETE,
        chatIds
    }
}

export const setContactsToDelete = contactIds => {
    return {
        type: SET_CONTACTS_TO_DELETE,
        contactIds
    }
}

export const setMessagesToDelete = messageIds => {
    return {
        type: SET_MESSAGES_TO_DELETE,
        messageIds
    }
}