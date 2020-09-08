import { SET_CHATS_TO_DELETE, SET_CONTACTS_TO_DELETE, SET_MESSAGES_TO_DELETE, RESET } from '../actions/actionTypes'

const initialState = {
    chatIds: {},
    messageIds: {},
    contactIds: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHATS_TO_DELETE:
            return {
                ...state,
                chatIds: action.chatIds
            }
        case SET_CONTACTS_TO_DELETE:
            return {
                ...state,
                contactIds: action.contactIds
            }
        case SET_MESSAGES_TO_DELETE:
            return {
                ...state,
                messageIds: action.messageIds
            }
        case RESET:
            return initialState
        default:
            return state
    }
}

export default reducer