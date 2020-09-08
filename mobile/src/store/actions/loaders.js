import { SET_LOADING, SET_REFRESHING } from './actionTypes'

export const setLoading = (loading, name) => {
    return {
        type: SET_LOADING,
        loading,
        name
    }
}

export const setRefreshing = (refreshing, name) => {
    return {
        type: SET_REFRESHING,
        refreshing,
        name
    }
}