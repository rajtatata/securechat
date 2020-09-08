# Secure Chat App

SecureChat is an application which uses encrypted messages to communicate between two parties.
#### Screenshots: [Click Here](https://github.com/rajtatata/securechat/tree/master/screenshots)

<hr>

#### The links below use my backend for sending messages, you are encouraged to build your own application and backend in order to increase security since you will have more control over the services that it uses (you can publish the app on Expo for free)

SecureChat firebase backend: [Click here](https://github.com/rajtatata/securechat-firebase-backend)

SecureChat on Expo: [Click here](https://expo.io/@flaviorajta/securechat)

SecureChat on PlayStore: [TBD](#)

SecureChat on AppStore: [TBD](#)
<hr>

## Installation

In order to build the app yourself please follow the firebase backend installation [here](https://github.com/rajtatata/securechat-firebase-backend) first
<br>
After setting up firebase please modify `messengerApp.config.js` file 

```js
serverURI: {
    // change the url below to match your firebase cloud functions base url
    firebase: "https://[some-location-project-name].cloudfunctions.net/",
}
realtimeDb: {
    // also change apiKey and your database url
    firebaseConfig: {
        apiKey: "[your-web-api-key]",
        databaseURL: "https://[project-name].firebaseio.com",
    }
}
```
After changing the configurations run:
```bash
npm install # install the repo packages
npm start # run app in expo
```

## Usage

In order to communicate with another person you both need to first install the same app, create a user on the welcome screen and exchange each others info by scanning the QR code on the profile page.

## Application Work Flow

- On the welcome screen the user needs to define a `Display Name` and a `Master Password`
- Once those are set the app will generate a key pair (public, private)
- The `Master Password` will be used to encrypt the private key 
    - private key will be saved on local db encrypted and not as plain text
    - this increases security in case someone gets hold of our physical device and reads the local db
- An admin is created and saved to local db
- In order to add contacts we need to scan QR code of the other contact on his profile page
    - This needs to be done both ways, he needs to add your contact also
    - The QR code contains the contact `id, display name, public key`
    - By scanning both ways we are not relying on a third party (which could be malicious) to exchange contact info
- After adding the contact we are ready to start exchanging messages between the two
- Before a message is sent:
    - it is first encrypted
    - sent online (we get a timestamp back)
    - then saved to local db
    - then saved to redux state
- The app listens to new messages also:
    - Once a new message is available it gets stored on db
    - then it gets decrypted
    - then it is saved in state
- As you can see the message on local db will always remain encrypted
    - messages are decrypted only when application is run
    - this increases security in case someone gets hold of our physical device and reads the local db

## Encryption 

For encrypting messages the app uses TweetNacl.js

In order to encrypt/decrypt messages we combine our private key together with the other contacts public key to derive a shared key (Diffie-Hellman)

This shared key is used to symmetrically encrypt/decrypt messages
<hr>

TweetNacl.js official repo: [Click here](https://github.com/dchest/tweetnacl-js)

My modified TweetNacl.js to work with Expo: [Click here](https://github.com/rajtatata/react-native-expo-tweet-nacl)

<hr>

## Reason behind the App

I am a big fan of cryptography and also always wanted to build some type of messenger app which would be end-to-end encrypted. In order to make it "stand out" and not be just one of hundreds of other messaging apps I thought of ways to improve the security overall.
- Encrypting/Decrypting messages requires for you to have your private key and the other persons public key. In order to minimize the risk of mitm(man-in-the-middle) attack adding contacts is done by scanning a QR code on the physical device. This way we don't rely on a third party service 😈 to exchange the public keys
- All the messages that are saved on the local db(sqlite) are encrypted and they are only decrypted when running the app. Also the private key is encrypted with a password when the user is first created. This will improve security if someone gets hold of your physical device and tries to read the local db from storage
- Every message going out to and from the server is always encrypted. The backend server will delete messages as soon as they are read by the client. The server will keep encrypted messages, even if the server gets hacked they won't be able to decrypt anything (or at least not in reasonable amount of time)
- This app is intentionally made open source because I want to encourage everyone to make their own build, create their own backend, this way you are in control of everything and you don't have to trust me 😉 or anyone else. You can install and try my app as a demo, but if you really want to use it I suggest you make your own build (which is free when using ExpoClient and Firebase), you don't have to use my app.

## Next Steps
### Optimizations
- Performance optimizations on initial load
    - The app reads all messages from the local db into ram, this will decrase performance if we have a large number of messages
    - Maybe read a limited number of messages for each contact on first load, and then read more messages as user is scrolling inside the chat
- Performance optimization on decrypting messages
    - Currently messages are being decrypted one by one, and updating redux state one by one
    - Batching these updates might increase performance

### New Features
- Notifications on new messages
    - The app currently does not send notifications when it is closed
    - I plan on adding support for [OneSignal](https://onesignal.com/) in the future
- NodeJs backend
    - Initially I intended to develop two backends (nodejs, and firebase)
        - Firebase would be a cheaper option since it can be used for free
        - NodeJs would be on option if we want to host the server somewhere
    - Since this project took too much of my time I only finished firebase backend, and decided to finish NodeJs backend later on
- Seen/Sent/Delivered message statuses
    - Currently there is no support for message statuses

## Contributing
Security of this app is very important, if you find any problems, bugs, security issues or if you have questions about something which you don't understand please let me know. 

I am open to any suggestion.

## Credits

- UI inspiration
    - [Secure message app logo](https://dribbble.com/shots/6824444-Secure-message-app-logo) by [Oğuzhan Dursun](https://dribbble.com/ChaplinGG)
    - [Social app UI chat](https://dribbble.com/shots/6375976-Social-app-UI-chat) by [brio6](https://dribbble.com/brio6)
    - [Settings and profile](https://dribbble.com/shots/4840514-Settings-and-profile) by [Johny vino™](https://dribbble.com/johnyvino)
    - [Onboarding Illustrations](https://dribbble.com/shots/3290518-Onboarding-Illustrations) by [Lana Marandina](https://dribbble.com/lanamarandina)
- Other
    - [Animal Avatars](https://www.flaticon.com/packs/animal-27) by [Flat Icons](https://www.flaticon.com/)