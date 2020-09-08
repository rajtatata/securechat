export const parseQRData = (data) => {
    try {
        const parsedData = JSON.parse(data)
        // id, full_name, public_key, avatar, email
        if (parsedData.id && parsedData.full_name && parsedData.public_key && parsedData.avatar && parsedData.email) {
            return {
                id: parsedData.id,
                fullName: parsedData.full_name,
                publicKey: parsedData.public_key,
                avatar: parsedData.avatar,
                email: parsedData.email
            }
        }

        return null

    } catch (error) {
        return null
    }
}