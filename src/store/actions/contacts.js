import { SET_CONTACTS, ADD_NEW_CONTACT, DELETE_CONTACTS } from './actionTypes'

export const setContacts = (contacts) => {
    return {
        type: SET_CONTACTS,
        contacts: contacts
    }
}

export const deleteContacts = (contactIds) => {
    return {
        type: DELETE_CONTACTS,
        contactIds: contactIds
    }
}

export const addNewContact = (data) => {
    return {
        type: ADD_NEW_CONTACT,
        contact: data
    }
}
