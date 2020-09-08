import { CONNECT_REALTIME_DB } from '../actions/actionTypes'

const initialState = {
    connected: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CONNECT_REALTIME_DB:
            return {
                connected: true
            }
        default:
            return state
    }
}

export default reducer