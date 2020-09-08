import { SET_SETTINGS, RESET } from '../actions/actionTypes'

const initialState = {
    backgroundLock: 1,
    acceptNotifications: 1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SETTINGS:
            const settings = {}
            action.settings.forEach(s => {
                const { key, value } = s
                settings[key] = value
            })
            return {
                ...state,
                ...settings
            }
        case RESET:
            return initialState
        default:
            return state
    }
}

export default reducer