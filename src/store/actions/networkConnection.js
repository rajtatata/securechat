import { SET_NETWORK_CONNECTION } from './actionTypes'

export const setNetworkConnection = (connected) => {
    return {
        type: SET_NETWORK_CONNECTION,
        connected: connected
    }
}