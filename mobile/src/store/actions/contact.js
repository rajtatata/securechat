import { SET_CONTACTS } from './actionTypes'
import { getContacts as getContactsDb, insertContact as insertContactDb, deleteContacts as deleteContactsDb } from '../../services/database/contact'
import { deleteChats } from './message'
import { setRefreshing } from '../actions/loaders'
import { REFRESH_CONTACTS } from '../../utils/constants'

export const setContacts = (contacts) => {
    return {
        type: SET_CONTACTS,
        contacts
    }
}

export const getContacts = () => {
    return async (dispatch, getState) => {
        dispatch(setRefreshing(true, REFRESH_CONTACTS))
        const contacts = await getContactsDb(getState().database.conn)
        if (contacts) {
            dispatch(setContacts(contacts))
        }
        dispatch(setRefreshing(false, REFRESH_CONTACTS))
    }
}

export const insertContact = ({ id, full_name, public_key, avatar }) => {
    return (dispatch, getState) => {
        insertContactDb(
            getState().database.conn,
            { id, full_name, public_key, avatar }
        )
        dispatch(getContacts())
    }
}

export const deleteContacts = (contactIds) => {
    return (dispatch, getState) => {
        deleteContactsDb(getState().database.conn, Object.keys(contactIds))
        dispatch(deleteChats(contactIds))
        dispatch(getContacts())
    }
}