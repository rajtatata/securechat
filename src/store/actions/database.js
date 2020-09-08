import { SET_DB_CONN } from './actionTypes'

export const setDbConnection = (dbConn) => {
    return {
        type: SET_DB_CONN,
        dbConn: dbConn
    }
}