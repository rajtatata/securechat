# Secure Chat App

SecureChat is an application which uses encrypted messages to communicate between two parties.
#### Screenshots: [Click Here](https://github.com/rajtatata/securechat/tree/master/screenshots)

<hr>

#### The links below use my backend for sending messages, you are encouraged to build your own application and backend in order to increase security since you will have more control over the services that it uses (you can publish the app on Expo for free)

SecureChat on PlayStore: [Secure Chat](https://play.google.com/store/apps/details?id=com.rajtatata.securechat)

SecureChat on AppStore: [TBD](#)
<hr>

## Project Overview

The project is seperated in two parts, `backend` and `mobile`. 
- Backend
    - The backend part is build with NodeJs 
    - It has a `docker-compose` file which pulls all the necessary images to run everything smoothly.
    - The images used here are `node` for running the Nodejs app, `mongo` as the database for storing objects and `redis` for making possible realtime chatting.
    - `mongo-express` and `nginx` images are used to locally access the db and for storing avatar images.
    - In order to run the backend, go into directory and first install packages with `npm install` and then run the containers with `docker-compose up`
- Mobile
    - The mobile part is build with React Native using Expo
    - In order to connect to the correct backend you must change the `BASE_URL` at `/src/config/environment.js`
    - To run the app you simply go into the directory, install packages and start the app with `npm start`

## Usage

In order to communicate with another person you both need to first install the same app, create a user on the welcome screen and exchange each others info by scanning the QR code on the profile tab.

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

### New Features (version 2.0.0)
- Now the app supports push notifications
    - It uses Expo Notification for handling this
- Backend is completely rebuild in NodeJs
    - The database used is MongoDb
    - Backend realtime messaging is made possible by using Socketio together with Redis subscribe/publish feature

## Contributing
Security of this app is very important, if you find any problems, bugs, security issues or if you have questions about something which you don't understand please let me know. 

I am open to any suggestion.

## Credits

- UI inspiration
    - [Chat app concept](https://dribbble.com/shots/6324084-Chat-app-concept) by [Janis Gulbis](https://dribbble.com/JanisGulbis)
    - [Onboarding Investment App](https://dribbble.com/shots/6947447-Onboarding-Investment-App) by [salestinus sustyo h](https://dribbble.com/saleseles)
    - [Lego avatars Icon Pack](https://www.flaticon.com/packs/lego-avatars-3) by [smashicons](https://www.flaticon.com/authors/smashicons)
    
- Onboarding Images
    - [Man Chatting and Walking](https://image.freepik.com/free-vector/vector-illustration-man-chatting-walking-flat-style_19361-41.jpg)
    - [Privacy and Security](https://fastestvpn.com/blog/wp-content/uploads/2017/11/digital-privacy-threats.png)
    - [QR Code Sharing](https://cdn4.vectorstock.com/i/1000x1000/24/78/qr-code-scanning-concept-vector-28332478.jpg)
- Other
    - [Lego avatars Icon Pack](https://www.flaticon.com/packs/lego-avatars-3) by [smashicons](https://www.flaticon.com/authors/smashicons)
