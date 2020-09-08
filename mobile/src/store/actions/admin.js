import { SET_ADMIN } from './actionTypes'
import { getAdmin as getAdminDb, insertAdmin as insertAdminDb, updateAdmin as updateAdminDb } from '../../services/database/admin'
import { signup as signupServer, randomAvatar } from '../../services/network/user'
import { setAlertOptions, setShowAlert } from './alert'

export const setAdmin = (admin) => {
    return {
        type: SET_ADMIN,
        admin
    }
}

export const getAdmin = () => {
    return async (dispatch, getState) => {
        const admin = await getAdminDb(getState().database.conn)
        if (admin) {
            dispatch(setAdmin(admin))
        }
    }
}

export const signup = ({ expoPushToken, installationId, full_name, public_key, private_key, privateKeyNonce }) => {
    return async (dispatch, getState) => {
        const user = await signupServer({ expoPushToken, installationId })
        const avatar = await randomAvatar()
        if (user && avatar) {
            insertAdminDb(
                getState().database.conn,
                { id: user._id, full_name, public_key, private_key, privateKeyNonce, avatar }
            )
            dispatch(getAdmin())
            return true
        } else {
            dispatch(setAlertOptions({
                title: 'Error',
                message: 'Check Network Connection!',
                showCancelButton: false,
                showConfirmButton: true,
                confirmText: 'OK',
            }))
            dispatch(setShowAlert(true))
            return null
        }
    }
}

export const updateAdmin = ({ private_key, privateKeyNonce, full_name }) => {
    return (dispatch, getState) => {
        updateAdminDb(
            getState().database.conn,
            { private_key, privateKeyNonce, full_name }
        )
        const admin = getAdminDb(getState().database.conn)
        dispatch(setAdmin(admin))
    }
}