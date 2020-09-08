export const config = {
    dbName: "messengerapp",
    dbTables: {
        adminTable: "admin",
        contactsTable: "contacts",
        messagesTable: "messages"
    },
    serverURI: {
        firebase: "https://[some-location-project-name].cloudfunctions.net/", // replace this with your firebase cloud functions base url
        nodejs: ""
    },
    serverEndPoints: {
        deleteMessage: "deleteMessage",
        getUserId: "getUserId",
        sendMessage: "sendMessage",
        getRandomAvatar: "getRandomAvatar"
    },
    serverType: "firebase",
    realtimeDb: {
        root: "secure_messages",
        firebaseConfig: {
            apiKey: "[your-web-api-key]", // replace this with your firebase web api key
            databaseURL: "https://[project-name].firebaseio.com", // replace this with your database url
        }
    }
}