import { SQLite } from 'expo-sqlite'

import { config } from '../../messengerApp.config'

// db and table functions -------------------------------------------------------
export const initializeDatabase = () => {
    return new Promise((resolve, reject) => {
        let dbConn
        getDbConn()
            .then(conn => {
                dbConn = conn
                return createTables(dbConn)
            })
            .then(() => {
                resolve(dbConn)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const getDbConn = () => {
    return new Promise((resolve, reject) => {
        resolve(SQLite.openDatabase(config.dbName))
    })
}

const createTables = (dbConn) => {
    return new Promise((resolve, reject) => {
        dbConn.transaction(tx => {
            // create admin table
            tx.executeSql(
                "create table if not exists " + config.dbTables.adminTable + " (id text primary key not null, full_name text, email text, public_key text, private_key text, private_key_nonce text, avatar text)",
                [],
                null,
                (_, err) => {
                    reject(err)
                }
            )

            // create contacts table
            tx.executeSql(
                "create table if not exists " + config.dbTables.contactsTable + " (id text primary key not null, full_name text, email text, public_key text, avatar text)",
                [],
                null,
                (_, err) => {
                    reject(err)
                }
            )

            // create messages table
            tx.executeSql(
                "create table if not exists " + config.dbTables.messagesTable + " (id integer primary key not null, contact_id text, message text, message_nonce, timestamp int, message_type int)",
                [],
                null,
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, resolve())
    })
}

export const resetDb = (dbConn) => {
    return new Promise((resolve, reject) => {
        {
            dbConn.transaction(tx => {
                // create admin table
                tx.executeSql(
                    "drop table if exists " + config.dbTables.adminTable,
                    [],
                    null,
                    (_, err) => {
                        reject(err)
                    }
                )

                // create contacts table
                tx.executeSql(
                    "drop table if exists " + config.dbTables.contactsTable,
                    [],
                    null,
                    (_, err) => {
                        reject(err)
                    }
                )

                // create messages table
                tx.executeSql(
                    "drop table if  exists " + config.dbTables.messagesTable,
                    [],
                    null,
                    (_, err) => {
                        reject(err)
                    }
                )
            }, err => {
                reject(err)
            }, resolve())
        }
    })
}

// admin functions -------------------------------------------------------
export const insertAdmin = (dbConn, { id, fullName, email = "N/A", publicKey, privateKey, privateKeyNonce, avatar = "" }) => {
    return new Promise((resolve, reject) => {
        dbConn.transaction(tx => {
            tx.executeSql(
                "insert into " + config.dbTables.adminTable + " (id, full_name, email, public_key, private_key, private_key_nonce, avatar) values (?, ?, ?, ?, ?, ?, ?)",
                [
                    id, fullName, email, publicKey, privateKey, privateKeyNonce, avatar
                ],
                () => resolve(),
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, null)
    })
}

export const updateAdminFullName = (dbConn, fullName) => {
    return new Promise((resolve, reject) => {
        dbConn.transaction(tx => {
            tx.executeSql(
                "update " + config.dbTables.adminTable + " set full_name=? where 1",
                [
                    fullName
                ],
                () => resolve(),
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, null)
    })
}

export const updateAdminPassCode = (dbConn, { privateKey, privateKeyNonce }) => {
    return new Promise((resolve, reject) => {
        if (!privateKey || !privateKeyNonce) {
            reject()
        }

        dbConn.transaction(tx => {
            tx.executeSql(
                "update " + config.dbTables.adminTable + " set private_key=?, private_key_nonce=? where 1",
                [
                    privateKey, privateKeyNonce
                ],
                () => resolve(),
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, null)
    })
}

export const getAdmin = (dbConn) => {
    return new Promise((resolve, reject) => {
        dbConn.transaction(tx => {
            tx.executeSql(
                "select * from " + config.dbTables.adminTable,
                [],
                (_, { rows }) => {
                    resolve(rows)
                },
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, null)
    })
}

// contact functions -------------------------------------------------------
export const insertContact = (dbConn, { id, fullName, email = "N/A", publicKey, avatar = "" }) => {
    return new Promise((resolve, reject) => {
        dbConn.transaction(tx => {
            tx.executeSql(
                "insert into " + config.dbTables.contactsTable + " (id, full_name, email, public_key, avatar) values (?, ?, ?, ?, ?)",
                [
                    id, fullName, email, publicKey, avatar
                ],
                () => resolve(),
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, null)

    })
}

export const getContacts = (dbConn) => {
    return new Promise((resolve, reject) => {
        dbConn.transaction(tx => {
            tx.executeSql(
                "select * from " + config.dbTables.contactsTable,
                [],
                (_, { rows }) => {
                    resolve(rows)
                },
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, null)
    })

}

export const deleteContacts = (dbConn, contactIds) => {
    let queryString = ""
    contactIds.forEach(id => {
        queryString += "'" + id + "',"
    })

    return new Promise((resolve, reject) => {
        dbConn.transaction(tx => {
            tx.executeSql(
                "delete from " + config.dbTables.contactsTable + " where id in (" + queryString.slice(0, -1) + ")",
                [],
                () => resolve(),
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, resolve())
    })
}

// message functions -------------------------------------------------------
export const insertMessage = (dbConn, { contactId, message, messageNonce, timestamp, messageType }) => {
    return new Promise((resolve, reject) => {
        dbConn.transaction(tx => {
            tx.executeSql(
                "insert into " + config.dbTables.messagesTable + " (contact_id, message, message_nonce, timestamp, message_type) values (?, ?, ?, ?, ?)",
                [
                    contactId, message, messageNonce, timestamp, messageType
                ],
                (_, { insertId }) => {
                    resolve(insertId)
                },
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, null)


    })
}

export const getMessages = (dbConn) => {
    return new Promise((resolve, reject) => {
        dbConn.transaction(tx => {
            tx.executeSql(
                "select * from " + config.dbTables.messagesTable,
                [],
                (_, { rows }) => {
                    resolve(rows)
                },
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, null)
    })

}

export const deleteMessages = (dbConn, messageIds) => {
    let queryString = ""
    messageIds.forEach(id => {
        queryString += "'" + id + "',"
    })
    return new Promise((resolve, reject) => {
        dbConn.transaction(tx => {
            tx.executeSql(
                "delete from " + config.dbTables.messagesTable + " where id in (" + queryString.slice(0, -1) + ")",
                [],
                () => resolve(),
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, resolve())
    })
}

// chats -------------------------------------------------------
export const deleteChats = (dbConn, contactIds) => {

    let queryString = ""
    contactIds.forEach(id => {
        queryString += "'" + id + "',"
    })

    return new Promise((resolve, reject) => {
        dbConn.transaction(tx => {
            tx.executeSql(
                "delete from " + config.dbTables.messagesTable + " where contact_id in (" + queryString.slice(0, -1) + ")",
                [],
                () => resolve(),
                (_, err) => {
                    reject(err)
                }
            )
        }, err => {
            reject(err)
        }, resolve())
    })
}