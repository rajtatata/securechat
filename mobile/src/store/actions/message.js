import { DELETE_MESSAGES, SET_NEW_COUNTER, SET_CHAT_MESSAGES, SET_CHATS, SET_LOAD_MORE, SET_DECRYPTED_MESSAGES } from './actionTypes'
import { setRefreshing, setLoading } from './loaders'
import { MESSAGE_SENT } from '../../utils/constants'
import { showAlert } from '../../components/DropDownAlert/DropDownAlertRef'
import { REFRESH_CHATS } from '../../utils/constants'
import { encryptMessage } from '../../utils/crypto'
import { SENDING_MESSAGE, CHAT_MESSAGE_PAGE_LIMIT } from '../../utils/constants'
import { scrollViewRef, scrollToEnd } from '../../components/SingleChatView/ScrollViewRef'

import {
    deleteChats as deleteChatsDb,
    deleteMessages as deleteMessagesDb,
    getChatMessages as getChatMessagesDb,
    getChats as getChatsDb,
    insertMessage as insertMessageDb,
    setChatSeen as setChatSeenDb,
    getUnseenCounter as getUnseenCounterDb
} from '../../services/database/message'

export const setDecryptedMessages = decryptedMessages => {
    return {
        type: SET_DECRYPTED_MESSAGES,
        decryptedMessages
    }
}

export const setLoadMore = loadMore => {
    return {
        type: SET_LOAD_MORE,
        loadMore
    }
}

export const setChats = chats => {
    return {
        type: SET_CHATS,
        chats
    }
}

export const setChatMessages = messages => {
    return {
        type: SET_CHAT_MESSAGES,
        messages
    }
}

export const setNewCounter = counter => {
    return {
        type: SET_NEW_COUNTER,
        counter
    }
}

export const getChats = () => {
    return async (dispatch, getState) => {
        dispatch(setRefreshing(true, REFRESH_CHATS))
        const chats = await getChatsDb(getState().database.conn)
        const c = await getUnseenCounterDb(getState().database.conn)
        if (chats) {
            dispatch(setChats(chats))
            dispatch(setNewCounter(c.counter))
        }
        dispatch(setRefreshing(false, REFRESH_CHATS))
    }
}

export const deleteChats = (contactIds) => {
    return (dispatch, getState) => {
        deleteChatsDb(getState().database.conn, Object.keys(contactIds))
        dispatch(getChats())
    }
}

export const getChatMessages = (contact_id, page = 0) => {
    return async (dispatch, getState) => {
        const loadMore = getState().messages.loadMore
        if (loadMore || page === 0) {
            const messages = await getChatMessagesDb(getState().database.conn, contact_id, page)
            if (page === 0) {
                setChatSeenDb(getState().database.conn, contact_id)
                dispatch(setChatMessages(messages))
            } else {
                if (messages.length > 0) {
                    dispatch(setChatMessages([...messages, ...getState().messages.chatMessages]))
                }
            }

            if (messages.length === 0 || messages.length < CHAT_MESSAGE_PAGE_LIMIT) {
                dispatch(setLoadMore(false))
            } else {
                dispatch(setLoadMore(true))
            }
        }
    }
}

export const deleteMessages = (messageIds) => {
    return (dispatch, getState) => {
        dispatch((() => {
            return {
                type: DELETE_MESSAGES,
                messageIds: Object.keys(messageIds)
            }
        })())
        deleteMessagesDb(getState().database.conn, Object.keys(messageIds))
        dispatch(getChats())
    }
}

export const insertReceivedMessage = ({ contact_id, message, message_nonce, timestamp, message_type, seen, alertFlag }) => {
    return async (dispatch, getState) => {
        let insideChat = false
        if (message_type === MESSAGE_SENT) {
            insideChat = true
        } else {
            insideChat = getState().messages.chatMessages && getState().messages.chatMessages.length > 0 && getState().messages.chatMessages[0].contact_id === contact_id
        }

        if (insideChat) {
            seen = true
        }

        const m = await insertMessageDb(
            getState().database.conn,
            { contact_id, message, message_nonce, timestamp, message_type, seen }
        )


        if (insideChat && m) {
            dispatch(setChatMessages([...getState().messages.chatMessages, m]))

            setTimeout(() => {
                if (scrollViewRef) {
                    scrollToEnd({ animated: false })
                }
            }, 300)

        }

        if (!insideChat && m) {
            if (alertFlag) {
                showAlert(
                    m.full_name,
                    "Sent you a new message."
                )
            }
            dispatch(getChats())
        }

    }
}

export const insertSentMessage = ({ message, contact_public_key, contact_id }) => {
    // this function will first insert decrypted message into state to make it seem smooth
    // then after encrypting, sending, and saving to db, it replaces this message with correct object
    return async (dispatch, getState) => {
        const socket = getState().socketio.socket
        const admin = getState().admin.data
        const chatMessages = getState().messages.chatMessages

        const mm = {
            contact_id,
            decryptedMessage: message,
            timestamp: Date.now(),
            message_type: MESSAGE_SENT,
            seen: 1
        }

        // insert before encrypt
        dispatch(setChatMessages([...chatMessages, mm]))

        // encrypt
        const enc = await encryptMessage(message, contact_public_key, admin.private_key)

        socket.emit('sendMessage', JSON.stringify({
            nonce: enc.nonce,
            message: enc.message,
            to: contact_id
        }))

        // insert in db
        const m = await insertMessageDb(
            getState().database.conn,
            {
                message: enc.message,
                message_nonce: enc.nonce,
                ...mm
            }
        )

        // // // insert after encrypt
        // dispatch(setChatMessages(getState().messages.chatMessages.map(e => {
        //     if (e === mm) {
        //         return { ...m, decryptedMessage: message }
        //     }
        //     return e
        // })))
    }
}