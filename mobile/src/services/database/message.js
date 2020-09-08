import { CHAT_MESSAGE_PAGE_LIMIT } from '../../utils/constants'

export const insertMessage = (dbConn, { contact_id, message, message_nonce, timestamp, message_type, seen }) => {
    return new Promise((resolve, reject) => {
        try {
            dbConn.transaction(tx => {
                tx.executeSql(
                    'insert into messages (contact_id, message, message_nonce, timestamp, message_type, seen) values (?, ?, ?, ?, ?, ?)',
                    [contact_id, message, message_nonce, timestamp, message_type, seen],
                    (tx, { insertId, rows }) => {
                        tx.executeSql(
                            'select m.*, c.public_key, c.full_name from messages m left join contacts c on m.contact_id = c.id where m.id = ? and c.public_key is not null',
                            [insertId],
                            (_, { rows }) => {
                                resolve(rows.item(0))
                            })
                    })
            }, error => console.log(error))
        } catch (error) {
            console.log(error)
            resolve(null)
        }
    })
}

export const deleteMessages = (dbConn, messageIds) => {
    dbConn.transaction(tx => {
        tx.executeSql(`delete from messages where id in (${messageIds.join(',')})`)
    })
}

export const deleteChats = (dbConn, contactIds) => {
    dbConn.transaction(tx => {
        tx.executeSql(
            `delete from messages where contact_id in (${contactIds.map(_ => '?').join(',')})`,
            contactIds
        )
    })
}

export const getChats = dbConn => {
    return new Promise((resolve, reject) => {
        try {
            dbConn.transaction(tx => {
                tx.executeSql(
                    'select m1.*, c.avatar, c.full_name, c.public_key ' +
                    'from messages m1 ' +
                    'left join messages m2 on (m1.contact_id = m2.contact_id and m1.timestamp < m2.timestamp) ' +
                    'left join contacts c on (m1.contact_id = c.id) ' +
                    'where m2.timestamp is null and c.public_key is not null ' +
                    'order by m1.timestamp desc',
                    [],
                    (_, { rows }) => {
                        resolve(rows._array)
                        resolve([])
                    }
                )
            })
        } catch (error) {
            console.log(error)
            resolve(null)
        }
    })
}

export const getChatMessages = (dbConn, contact_id, page = 0) => {
    return new Promise((resolve, reject) => {
        try {
            dbConn.transaction(tx => {
                tx.executeSql(
                    'select m.*, c.public_key from messages m ' +
                    'left join contacts c on m.contact_id = c.id ' +
                    'where m.contact_id = ? order by timestamp desc limit ?, ?',
                    [contact_id, CHAT_MESSAGE_PAGE_LIMIT * page, CHAT_MESSAGE_PAGE_LIMIT],
                    (_, { rows }) => {
                        resolve(rows._array.reverse())
                    }
                )
            })
        } catch (error) {
            console.log(error)
            resolve(null)
        }
    })
}

export const setChatSeen = (dbConn, contact_id) => {
    dbConn.transaction(tx => {
        tx.executeSql(`update messages set seen = 1 where contact_id = ?`, [contact_id])
    })
}

export const getUnseenCounter = (dbConn) => {
    return new Promise((resolve, reject) => {
        try {
            dbConn.transaction(tx => {
                tx.executeSql(
                    'select count(distinct m.contact_id) as counter from messages m' +
                    ' left join contacts c on c.id = m.contact_id where m.seen = 0 and c.public_key is not null',
                    [],
                    (_, { rows }) => {
                        resolve(rows.item(0))
                    }
                )
            })
        } catch (error) {
            console.log(error)
            resolve(null)
        }
    })
}