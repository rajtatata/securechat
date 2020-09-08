import { SET_DB_CONN, RESET } from './actionTypes'
import { getDbConn, createAdminTable, createContactsTable, createMessagesTable, resetDb, createSettingsTable } from '../../services/database/init'
import { reset as resetServer } from '../../services/network/user'

export const setDbConn = dbConn => {
    return {
        type: SET_DB_CONN,
        dbConn
    }
}

export const resetState = () => {
    return {
        type: RESET
    }
}

export const initDb = () => {
    return dispatch => {
        const dbConn = getDbConn()
        dispatch(setDbConn(dbConn))
        createAdminTable(dbConn)
        createSettingsTable(dbConn)
        createContactsTable(dbConn)
        createMessagesTable(dbConn)
    }
}

export const reset = (installationId) => {
    return (dispatch, getState) => {
        const userId = getState().admin.data.id
        const socket = getState().socketio.socket
        if (socket) {
            socket.disconnect()
        }
        resetDb(getState().database.conn)
        dispatch(resetState())
        resetServer({ userId, installationId })
    }
}