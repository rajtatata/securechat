import { SET_SOCKET } from './actionTypes'

export const setSocket = socket => {
    return {
        type: SET_SOCKET,
        socket
    }
}