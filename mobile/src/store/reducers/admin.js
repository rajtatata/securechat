import { SET_ADMIN, RESET } from '../actions/actionTypes'

const initialState = {
    data: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN:
            return {
                ...state,
                data: action.admin
            }
        case RESET:
            return initialState
        default:
            return state
    }
}

export default reducer