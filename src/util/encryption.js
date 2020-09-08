import nacl from 'tweet-nacl-react-native-expo'

export const generateKeys = () => {
    return new Promise(async (resolve, reject) => {
        const keyPair = await nacl.box.keyPair()
        resolve(keyPair)
    })
}

export const encryptPrivateKey = (privateKey, passCode) => {
    return new Promise(async (resolve, reject) => {
        const nonce = await nacl.randomBytes(24)
        const passCodeUTF8 = nacl.util.decodeUTF8(passCode)
        const passCodeUint8 = new Uint8Array(32)
        passCodeUint8.set(passCodeUTF8, 0)
        const encryptedPrivateKey = nacl.box.after(privateKey, nonce, passCodeUint8)
        resolve({ encryptedPrivateKey, nonce })
    })
}

export const decryptPrivateKey = (privateKey, passCode, nonce) => {
    return new Promise((resolve, reject) => {
        const passCodeUTF8 = nacl.util.decodeUTF8(passCode)
        const passCodeUint8 = new Uint8Array(32)
        passCodeUint8.set(passCodeUTF8, 0)
        const decryptedPrivateKey = nacl.box.open.after(privateKey, nonce, passCodeUint8)

        resolve(decryptedPrivateKey)
    })
}

export const encryptMessage = (message, theirPublicKey, myPrivateKey) => {
    return new Promise(async (resolve, reject) => {
        const sharedKey = nacl.box.before(theirPublicKey, myPrivateKey)
        const messageDecoded = new Uint8Array(nacl.util.decodeUTF8(message))
        const nonce = await nacl.randomBytes(24)
        const encryptedMessage = nacl.box.after(messageDecoded, nonce, sharedKey)

        resolve({ encryptedMessage, nonce })
    })
}

export const decryptMessage = (message, theirPublicKey, myPrivateKey, nonce) => {
    return new Promise((resolve, reject) => {
        const sharedKey = nacl.box.before(theirPublicKey, myPrivateKey)
        const messageDecoded = nacl.util.decodeBase64(message)
        const decryptedMessage = nacl.box.open.after(messageDecoded, nonce, sharedKey)

        resolve(nacl.util.encodeUTF8(decryptedMessage))
    })
}