import nacl from 'tweet-nacl-react-native-expo'

export const parseContacts = (contacts) => {
    const contactsArray = {}

    contacts.forEach(c => {
        contactsArray[c.id] = {
            fullName: c.full_name,
            publicKey: nacl.util.decodeBase64(c.public_key),
            avatar: c.avatar,
            email: c.email
        }
    })

    return contactsArray
}

export const parseNewContact = (c) => {
    return {
        id: c.id,
        fullName: c.fullName,
        publicKey: nacl.util.decodeBase64(c.publicKey),
        avatar: c.avatar,
        email: c.email
    }
}