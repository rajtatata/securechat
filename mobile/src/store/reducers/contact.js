import { SET_CONTACTS, RESET } from '../actions/actionTypes'

const initialState = {
    list: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTACTS:
            return {
                ...state,
                list: action.contacts
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