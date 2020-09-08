import { CLEAR_NOTIFICATION_COUNTER, INCREMENT_NOTIFICATION_COUNTER, SET_LISTEN_NOTIFICATION_CHANGES } from '../actions/actionTypes'

const initialState = {
    notifications: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_NOTIFICATION_COUNTER:
            return {
                notifications: {
                    ...state.notifications,
                    [action.contactId]: {
                        ...state.notifications[action.contactId],
                        counter: 0
                    }
                }
            }
        case INCREMENT_NOTIFICATION_COUNTER:
            const prevCounter = state.notifications[action.contactId] && state.notifications[action.contactId].counter ? state.notifications[action.contactId].counter : 0
            return {
                notifications: {
                    ...state.notifications,
                    [action.contactId]: {
                        ...state.notifications[action.contactId],
                        counter: prevCounter + 1
                    }
                }
            }
        case SET_LISTEN_NOTIFICATION_CHANGES:
            return {
                notifications: {
                    ...state.notifications,
                    [action.contactId]: {
                        ...state.notifications[action.contactId],
                        listen: action.listen
                    }
                }
            }
        default:
            return state
    }
}

export default reducer