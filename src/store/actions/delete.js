import {
    SELECT_CONTACT_TO_DELETE,
    DESELECT_CONTACT_TO_DELETE,
    DESELECT_ALL_CONTACTS_TO_DELETE,
    SELECT_CHAT_TO_DELETE,
    DESELECT_CHAT_TO_DELETE,
    DESELECT_ALL_CHATS_TO_DELETE,
    SELECT_MESSAGE_TO_DELETE,
    DESELECT_MESSAGE_TO_DELETE,
    DESELECT_ALL_MESSAGES_TO_DELETE,

} from './actionTypes'

// -----------------------------------------------------
export const selectContactToDelete = (contactId) => {
    return {
        type: SELECT_CONTACT_TO_DELETE,
        contactId: contactId
    }
}

export const deselectContactToDelete = (contactId) => {
    return {
        type: DESELECT_CONTACT_TO_DELETE,
        contactId: contactId
    }
}

export const deselectAllContactsToDelete = () => {
    return {
        type: DESELECT_ALL_CONTACTS_TO_DELETE,
    }
}

// -----------------------------------------------------
export const selectChatToDelete = (contactId) => {
    return {
        type: SELECT_CHAT_TO_DELETE,
        contactId: contactId
    }
}

export const deselectChatToDelete = (contactId) => {
    return {
        type: DESELECT_CHAT_TO_DELETE,
        contactId: contactId
    }
}

export const deselectAllChatsToDelete = () => {
    return {
        type: DESELECT_ALL_CHATS_TO_DELETE,
    }
}

// -----------------------------------------------------
export const selectMessageToDelete = (messageId) => {
    return {
        type: SELECT_MESSAGE_TO_DELETE,
        messageId: messageId
    }
}

export const deselectMessageToDelete = (messageId) => {
    return {
        type: DESELECT_MESSAGE_TO_DELETE,
        messageId: messageId
    }
}

export const deselectAllMessagesToDelete = () => {
    return {
        type: DESELECT_ALL_MESSAGES_TO_DELETE,
    }
}
