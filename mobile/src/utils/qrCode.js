export const createQRData = ({ id, full_name, public_key, avatar }) => {
    return JSON.stringify({ id, full_name, public_key, avatar })
}

export const parseQRData = data => {
    try {
        const parsedData = JSON.parse(data)
        // id, full_name, public_key, avatar
        if (parsedData.id && parsedData.full_name && parsedData.public_key && parsedData.avatar) {
            return parsedData
        }
        return null
    } catch (error) {
        return null
    }
}