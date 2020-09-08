import { SHOW_ALERT, REMOVE_ALERT } from './actionTypes'

export const showAlert = () => {
    return {
        type: SHOW_ALERT
    }
}

export const removeAlert = () => {
    return {
        type: REMOVE_ALERT
    }
}