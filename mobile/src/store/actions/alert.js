import { SET_ALERT_OPTIONS, SET_SHOW_ALERT } from './actionTypes'

export const setShowAlert = (show) => {
    return {
        type: SET_SHOW_ALERT,
        show
    }
}

export const setAlertOptions = ({ title, message, showCancelButton,
    showConfirmButton, cancelText, confirmText, onCancelPressed, onConfirmPressed }) => {

    return {
        type: SET_ALERT_OPTIONS,
        title, message, showCancelButton,
        showConfirmButton, cancelText,
        confirmText, onCancelPressed, onConfirmPressed
    }
}