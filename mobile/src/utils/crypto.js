import nacl from 'tweet-nacl-react-native-expo'

export const generateKeys = async () => {
    const { publicKey, secretKey } = await nacl.box.keyPair()
    return {
        public_key: nacl.util.encodeBase64(publicKey),
        private_key: nacl.util.encodeBase64(secretKey)
    }
}

export const encryptPrivateKey = async (private_key, passCode) => {
    const nonce = await nacl.randomBytes(24)
    const passCodeUTF8 = nacl.util.decodeUTF8(passCode)
    const passCodeUint8 = new Uint8Array(32)
    passCodeUint8.set(passCodeUTF8, 0)
    const decodedPrivate = nacl.util.decodeBase64(private_key)
    const encryptedPrivateKey = nacl.box.after(decodedPrivate, nonce, passCodeUint8)

    return {
        private_key: nacl.util.encodeBase64(encryptedPrivateKey),
        nonce: nacl.util.encodeBase64(nonce)
    }
}

export const decryptPrivateKey = (private_key, passCode, nonce) => {
    const passCodeUTF8 = nacl.util.decodeUTF8(passCode)
    const passCodeUint8 = new Uint8Array(32)
    passCodeUint8.set(passCodeUTF8, 0)
    const decodedPrivate = nacl.util.decodeBase64(private_key)
    const decodedNonce = nacl.util.decodeBase64(nonce)
    const decryptedPrivateKey = nacl.box.open.after(decodedPrivate, decodedNonce, passCodeUint8)
    return {
        private_key: nacl.util.encodeBase64(decryptedPrivateKey)
    }
}

export const encryptMessage = async (message, theirPublicKey, myPrivateKey) => {
    const decodedPrivate = nacl.util.decodeBase64(myPrivateKey)
    const decodedPublic = nacl.util.decodeBase64(theirPublicKey)

    const sharedKey = nacl.box.before(decodedPublic, decodedPrivate)
    const messageDecoded = new Uint8Array(nacl.util.decodeUTF8(message))
    const nonce = await nacl.randomBytes(24)
    const encryptedMessage = nacl.box.after(messageDecoded, nonce, sharedKey)

    return {
        message: nacl.util.encodeBase64(encryptedMessage),
        nonce: nacl.util.encodeBase64(nonce),
    }
}

export const decryptMessage = (message, theirPublicKey, myPrivateKey, nonce) => {
    const decodedPrivate = nacl.util.decodeBase64(myPrivateKey)
    const decodedPublic = nacl.util.decodeBase64(theirPublicKey)
    const decodedMessage = nacl.util.decodeBase64(message)
    const decodedNonce = nacl.util.decodeBase64(nonce)

    const sharedKey = nacl.box.before(decodedPublic, decodedPrivate)
    const decryptedMessage = nacl.box.open.after(decodedMessage, decodedNonce, sharedKey)
    return nacl.util.encodeUTF8(decryptedMessage)
}