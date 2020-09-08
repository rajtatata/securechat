import { CLEAR_NOTIFICATION_COUNTER, INCREMENT_NOTIFICATION_COUNTER, SET_LISTEN_NOTIFICATION_CHANGES } from './actionTypes'

export const clearNotificationCounter = (contactId) => {
    return {
        type: CLEAR_NOTIFICATION_COUNTER,
        contactId: contactId
    }
}

export const incrementNotificationCounter = (contactId) => {
    return {
        type: INCREMENT_NOTIFICATION_COUNTER,
        contactId: contactId
    }
}

export const setListenForNotificationChanges = (contactId, listen) => {
    return {
        type: SET_LISTEN_NOTIFICATION_CHANGES,
        contactId: contactId,
        listen: listen
    }
}   
