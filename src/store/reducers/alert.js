import { SHOW_ALERT, REMOVE_ALERT } from '../actions/actionTypes'

const initialState = {
    shown: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                shown: true
            }
        case REMOVE_ALERT:
            return {
                shown: false
            }
        default:
            return state
    }
}

export default reducer