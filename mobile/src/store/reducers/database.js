import { SET_DB_CONN } from '../actions/actionTypes'

const initialState = {
    conn: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DB_CONN:
            return {
                ...state,
                conn: action.dbConn
            }
        default:
            return state
    }
}

export default reducer