import { SET_MESSAGES, SET_DECRYPTED_MESSAGE, NEW_MESSAGE, DELETE_CHATS, DELETE_MESSAGES } from '../actions/actionTypes'

const initialState = {
    list: {},
    contactMessages: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                list: action.messages,
                contactMessages: action.contactMessages
            }
        case SET_DECRYPTED_MESSAGE:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.messageId]: {
                        ...state.list[action.messageId],
                        decryptedMessage: action.decryptedMessage
                    }
                }
            }
        case NEW_MESSAGE:
            let temp = []
            if (state.contactMessages[action.message.contactId]) {
                temp = state.contactMessages[action.message.contactId]
            }

            return {
                ...state,
                list: {
                    ...state.list,
                    [action.message.id]: {
                        message: action.message.message,
                        messageNonce: action.message.messageNonce,
                        messageType: action.message.messageType,
                        timestamp: action.message.timestamp,
                        decryptedMessage: action.message.decryptedMessage
                    }
                },
                contactMessages: {
                    ...state.contactMessages,
                    [action.message.contactId]: [...temp, action.message.id]
                }
            }
        case DELETE_MESSAGES:
            const newState1 = {
                ...state,
                list: {
                    ...state.list
                },
                contactMessages: {
                    ...state.contactMessages,
                    [action.contactId]: state.contactMessages[action.contactId].filter(messageId => {
                        if (!action.messageIds.includes(messageId + "")) {
                            return messageId
                        }
                    })
                }
            }

            // delete messages from list
            action.messageIds.forEach(id => {
                delete newState1.list[id]
            })

            return newState1
        case DELETE_CHATS:
            const newState2 = { ...state, list: { ...state.list }, contactMessages: { ...state.contactMessages } }

            // delete contactMessages but keep track of messageIds
            let messageIds = []
            action.contactIds.forEach(elem => {
                messageIds = messageIds.concat(newState2.contactMessages[elem])
                delete newState2.contactMessages[elem]
            })

            // delete messages from list
            messageIds.forEach(elem => {
                delete newState2.list[elem]
            })

            return newState2
        default:
            return state
    }
}

export default reducer