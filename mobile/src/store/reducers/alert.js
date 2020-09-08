import { SET_SHOW_ALERT, SET_ALERT_OPTIONS, RESET } from '../actions/actionTypes'

const initialState = {
    show: false,
    options: {
        title: null,
        message: null,
        showCancelButton: null,
        showConfirmButton: null,
        cancelText: null,
        confirmText: null,
        onCancelPressed: null,
        onConfirmPressed: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOW_ALERT:
            return {
                ...state,
                show: action.show
            }
        case SET_ALERT_OPTIONS:
            return {
                ...state,
                options: {
                    title: action.title,
                    message: action.message,
                    showCancelButton: action.showCancelButton,
                    showConfirmButton: action.showConfirmButton,
                    cancelText: action.cancelText,
                    confirmText: action.confirmText,
                    onCancelPressed: action.onCancelPressed,
                    onConfirmPressed: action.onConfirmPressed
                }
            }
        case RESET:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default reducer