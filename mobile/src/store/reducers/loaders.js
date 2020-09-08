import { SET_REFRESHING, SET_LOADING, RESET } from '../actions/actionTypes'

const initialState = {
    refreshing: {},
    loading: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.name]: action.loading
                }
            }
        case SET_REFRESHING:
            return {
                ...state,
                refreshing: {
                    ...state.refreshing,
                    [action.name]: action.refreshing
                }
            }
        case RESET:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default reducer