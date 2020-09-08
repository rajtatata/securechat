import { config } from '../../messengerApp.config'
import * as firebase from 'firebase'

const serverUri = config.serverURI[config.serverType]

export const getUserId = () => {
    return new Promise((resolve, reject) => {

        fetch(serverUri + config.serverEndPoints.getUserId, {
            method: "post"
        })
            .then(res => res.json())
            .then(jsonRes => resolve(jsonRes.uid))
            .catch(err => {
                reject(err)
            })
    })
}

export const getRandomAvatar = () => {
    return new Promise((resolve, reject) => {

        fetch(serverUri + config.serverEndPoints.getRandomAvatar, {
            method: "post"
        })
            .then(res => res.json())
            .then(jsonRes => resolve(jsonRes.uri))
            .catch(err => {
                reject(err)
            })
    })
}

export const sendMessage = (from, to, message, nonce) => {
    return new Promise((resolve, reject) => {
        fetch(serverUri + config.serverEndPoints.sendMessage, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ from, to, message, nonce })
        })
            .then(res => res.json())
            .then(jsonRes => {
                jsonRes.status ? resolve(jsonRes.timestamp) : reject("no status returned")
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const deleteMessage = (message_id, user_id) => {
    return new Promise((resolve, reject) => {
        fetch(serverUri + config.serverEndPoints.deleteMessage, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message_id, user_id })
        })
            .then(res => res.json())
            .then(jsonRes => jsonRes.status ? resolve() : reject("no status returned"))
            .catch(err => {
                reject(err)
            })
    })
}

export const connectRealtimeDb = (ref) => {
    return new Promise((resolve, reject) => {
        firebase.initializeApp(config.realtimeDb.firebaseConfig)
        resolve(firebase.database().ref(ref))
    })
}