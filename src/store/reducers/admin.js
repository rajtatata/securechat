import { SET_ADMIN, CHANGE_ADMIN_NAME } from '../actions/actionTypes'

const initialState = {
    admin: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN:
            return {
                ...state,
                admin: action.admin
            }
        case CHANGE_ADMIN_NAME:
            return {
                ...state,
                admin: {
                    ...state.admin,
                    fullName: action.name
                }
            }
        default:
            return state
    }
}

export default reducer