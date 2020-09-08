export const upsertSettings = (dbConn, { key, value }) => {
    dbConn.transaction(tx => {
        tx.executeSql(
            `delete from settings where key = '${key}'`,
            [],
            (tx, _) => {
                tx.executeSql(`insert into settings (key, value) values ('${key}', ${value ? 1 : 0})`)
            })
    })
}

export const getSettings = dbConn => {
    return new Promise((resolve, reject) => {
        try {
            dbConn.transaction(tx => {
                tx.executeSql(
                    'select * from settings',
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