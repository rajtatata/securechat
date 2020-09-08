import {
    SELECT_CONTACT_TO_DELETE,
    DESELECT_CONTACT_TO_DELETE,
    DESELECT_ALL_CONTACTS_TO_DELETE,
    SELECT_CHAT_TO_DELETE,
    DESELECT_CHAT_TO_DELETE,
    DESELECT_ALL_CHATS_TO_DELETE,
    SELECT_MESSAGE_TO_DELETE,
    DESELECT_MESSAGE_TO_DELETE,
    DESELECT_ALL_MESSAGES_TO_DELETE
} from '../actions/actionTypes'

const initialState = {
    contactsToDelete: {},
    messagesToDelete: {},
    chatsToDelete: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CONTACT_TO_DELETE: {
            return {
                ...state,
                contactsToDelete: {
                    ...state.contactsToDelete,
                    [action.contactId]: true
                }
            }
        }
        case DESELECT_CONTACT_TO_DELETE: {
            return {
                ...state,
                contactsToDelete: {
                    ...state.contactsToDelete,
                    [action.contactId]: false
                }
            }
        }
        case DESELECT_ALL_CONTACTS_TO_DELETE: {
            return {
                ...state,
                contactsToDelete: {}
            }
        }
        case SELECT_CHAT_TO_DELETE: {
            return {
                ...state,
                chatsToDelete: {
                    ...state.chatsToDelete,
                    [action.contactId]: true
                }
            }
        }
        case DESELECT_CHAT_TO_DELETE: {
            return {
                ...state,
                chatsToDelete: {
                    ...state.chatsToDelete,
                    [action.contactId]: false
                }
            }
        }
        case DESELECT_ALL_CHATS_TO_DELETE: {
            return {
                ...state,
                chatsToDelete: {}
            }
        }
        case SELECT_MESSAGE_TO_DELETE: {
            return {
                ...state,
                messagesToDelete: {
                    ...state.messagesToDelete,
                    [action.messageId]: true
                }
            }
        }
        case DESELECT_MESSAGE_TO_DELETE: {
            return {
                ...state,
                messagesToDelete: {
                    ...state.messagesToDelete,
                    [action.messageId]: false
                }
            }
        }
        case DESELECT_ALL_MESSAGES_TO_DELETE: {
            return {
                ...state,
                messagesToDelete: {}
            }
        }
        default:
            return state
    }
}

export default reducer