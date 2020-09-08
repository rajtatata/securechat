import { SET_CONTACTS, ADD_NEW_CONTACT, DELETE_CONTACTS } from '../actions/actionTypes'

const initialState = {
    list: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTACTS:
            return {
                list: action.contacts
            }
        case ADD_NEW_CONTACT:
            return {
                list: {
                    ...state.list,
                    [action.contact.id]: {
                        fullName: action.contact.fullName,
                        publicKey: action.contact.publicKey,
                        avatar: action.contact.avatar,
                        email: action.contact.email
                    }
                }
            }
        case DELETE_CONTACTS:
            action.contactIds.forEach(elem => {
                delete state.list[elem]
            })
            return {
                list: {
                    ...state.list
                }
            }
        default:
            return state
    }
}

export default reducer