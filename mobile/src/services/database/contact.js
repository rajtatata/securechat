export const insertContact = (dbConn, { id, full_name, public_key, avatar }) => {
    dbConn.transaction(tx => {
        tx.executeSql(
            'insert into contacts (id, full_name, public_key, avatar) values (?, ?, ?, ?)',
            [id, full_name, public_key, avatar]
        )
    })
}

export const getContacts = dbConn => {
    return new Promise((resolve, reject) => {
        try {
            dbConn.transaction(tx => {
                tx.executeSql(
                    'select * from contacts order by full_name asc',
                    [],
                    (_, { rows }) => {
                        resolve(rows._array)
                    }
                )
            })
        } catch (error) {
            console.log(error)
            resolve(null)
        }
    })
}

export const deleteContacts = (dbConn, contactIds) => {
    dbConn.transaction(tx => {
        tx.executeSql(
            `delete from contacts where id in (${contactIds.map(_ => '?').join(',')})`,
            contactIds
        )
    })
}