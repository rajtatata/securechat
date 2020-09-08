
export const parseAdmin = (adminFromDb) => {
    return {
        avatar: adminFromDb.avatar,
        email: adminFromDb.email,
        fullName: adminFromDb.full_name,
        id: adminFromDb.id,
        privateKey: adminFromDb.private_key,
        privateKeyNonce: adminFromDb.private_key_nonce,
        publicKey: adminFromDb.public_key,
    }
}