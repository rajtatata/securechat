import { SET_NETWORK_CONNECTION } from '../actions/actionTypes'

const initialState = {
    connected: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NETWORK_CONNECTION:
            return {
                connected: action.connected
            }
        default:
            return state
    }
}

export default reducer