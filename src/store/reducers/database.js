import { SET_DB_CONN, RESET_DB } from '../actions/actionTypes'

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
        case RESET_DB:
            return {
                ...state,
                conn: null
            }
        default:
            return state
    }
}

export default reducer