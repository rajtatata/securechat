export const insertAdmin = (dbConn, { id, full_name, public_key, private_key, privateKeyNonce, avatar }) => {
    dbConn.transaction(tx => {
        tx.executeSql(
            'insert into admin (id, full_name, public_key, private_key, private_key_nonce, avatar) values (?, ?, ?, ?, ?, ?)',
            [id, full_name, public_key, private_key, privateKeyNonce, avatar]
        )
    })
}

export const getAdmin = dbConn => {
    return new Promise((resolve, reject) => {
        try {
            dbConn.transaction(tx => {
                tx.executeSql(
                    'select * from admin limit 1',
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

export const updateAdmin = (dbConn, { private_key, privateKeyNonce, full_name, avatar }) => {
    dbConn.transaction(tx => {
        if (avatar) {
            tx.executeSql('update admin set avatar = ? where 1', [avatar])
        }
        if (full_name) {
            tx.executeSql('update admin set full_name = ? where 1', [full_name])
        }
        if (privateKeyNonce) {
            tx.executeSql('update admin set private_key_nonce = ? where 1', [privateKeyNonce])
        }
        if (private_key) {
            tx.executeSql('update admin set private_key = ? where 1', [private_key])
        }
    })
}