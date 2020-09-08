import { SET_ADMIN, CHANGE_ADMIN_NAME } from './actionTypes'

export const setAdmin = (admin) => {
    return {
        type: SET_ADMIN,
        admin: admin
    }
}

export const changeAdminName = (name) => {
    return {
        type: CHANGE_ADMIN_NAME,
        name: name
    }
}
