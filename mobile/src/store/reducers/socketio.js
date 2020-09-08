import { SET_SOCKET, RESET } from '../actions/actionTypes'

const initialState = {
    socket: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SOCKET:
            // if (state.socket)
            //     state.socket.disconnect()

            return {
                ...state,
                socket: action.socket
            }
        case RESET:
            // if (state.socket)
            //     state.socket.disconnect()

            return {
                ...initialState
            }
        default:
            return state
    }
}

export default reducer