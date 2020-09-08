import { SET_SETTINGS } from './actionTypes'
import { getSettings as getSettingsDb, upsertSettings as upsertSettingsDb } from '../../services/database/settings'

export const setSettings = settings => {
    return {
        type: SET_SETTINGS,
        settings
    }
}

export const getSettings = () => {
    return async (dispatch, getState) => {
        const settings = await getSettingsDb(getState().database.conn)
        if (settings) {
            dispatch(setSettings(settings))
        }
    }
}

export const upsertSettings = ({ key, value }) => {
    return async (dispatch, getState) => {
        upsertSettingsDb(getState().database.conn, { key, value })
        dispatch(getSettings())
    }
}