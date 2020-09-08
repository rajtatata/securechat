import { SET_NEW_COUNTER, DELETE_MESSAGES, SET_CHAT_MESSAGES, SET_CHATS, SET_LOAD_MORE, RESET, SET_DECRYPTED_MESSAGES } from '../actions/actionTypes'

const initialState = {
    chats: null,
    chatMessages: null,
    newCounter: 0,
    loadMore: false,
    decryptedMessages: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHATS:
            return {
                ...state,
                chats: action.chats
            }
        case SET_CHAT_MESSAGES:
            return {
                ...state,
                chatMessages: action.messages
            }
        case DELETE_MESSAGES:
            return {
                ...state,
                chatMessages: state.chatMessages.filter(el => !action.messageIds.includes(el.id.toString()))
            }
        case SET_NEW_COUNTER:
            return {
                ...state,
                newCounter: action.counter
            }
        case SET_LOAD_MORE:
            return {
                ...state,
                loadMore: action.loadMore
            }
        case RESET:
            return {
                ...initialState
            }
        case SET_DECRYPTED_MESSAGES:
            return {
                ...state,
                decryptedMessages: action.decryptedMessages
            }
        default:
            return state
    }
}

export default reducer