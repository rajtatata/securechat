import * as SQLite from 'expo-sqlite'

export const getDbConn = () => {
    return SQLite.openDatabase('securechat')
}

export const createSettingsTable = dbConn => {
    dbConn.transaction(tx => {
        tx.executeSql(
            'create table if not exists settings (key text primary key not null, value integer)'
        )
    })
}

export const createAdminTable = dbConn => {
    dbConn.transaction(tx => {
        tx.executeSql(
            'create table if not exists admin (id text primary key not null, full_name text, public_key text, private_key text, private_key_nonce text, avatar text)'
        )
    })
}

export const createContactsTable = dbConn => {
    dbConn.transaction(tx => {
        tx.executeSql(
            'create table if not exists contacts (id text primary key not null, full_name text, public_key text, avatar text)'
        )
    })
}

export const createMessagesTable = dbConn => {
    dbConn.transaction(tx => {
        tx.executeSql(
            'create table if not exists messages (id integer primary key not null, contact_id text, message text, message_nonce text, timestamp int, message_type int, seen int)'
        )
    })
}

export const resetDb = dbConn => {
    dbConn.transaction(tx => {
        tx.executeSql('drop table if exists admin')
        tx.executeSql('drop table if exists contacts')
        tx.executeSql('drop table if exists messages')
        tx.executeSql('drop table if exists settings')
    })
}