import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import nacl from 'tweet-nacl-react-native-expo'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import { encryptMessage } from '../../../util/encryption'
import { sendMessage } from '../../../util/server'
import { messageType as messageTypes } from '../../../util/message'
import { insertMessage as insertMessageToDb } from '../../../util/database'
import { newMessage as insertMessageToState } from '../../../store/actions/messages'

class SingleChatInput extends Component {

    static buttonPressed = false
    state = {
        message: "",
        sendButtonloading: false
    }

    onSendMessage = () => {
        if (SingleChatInput.buttonPressed || this.state.message === "") {
            return
        }

        SingleChatInput.buttonPressed = true

        const { contactId, contact, myPrivate, myId, dbConn, networkConnected } = this.props

        if (!networkConnected) {
            alert("(Offline) Check network connection!")
            return
        }

        this.setState({
            sendButtonloading: true
        })

        const { message } = this.state
        const messageType = messageTypes.sent
        let encryptedMessage, nonce, decodedNonce, timestamp

        // encrypt message, get encrypted and nonce
        // send online
        // save to db
        // save to state
        encryptMessage(message, contact.publicKey, myPrivate)
            .then(result => {
                encryptedMessage = nacl.util.encodeBase64(result.encryptedMessage)
                nonce = nacl.util.encodeBase64(result.nonce)
                decodedNonce = result.nonce
                return sendMessage(myId, contactId, encryptedMessage, nonce)
            })
            .then(serverTimestamp => {
                timestamp = serverTimestamp
                return insertMessageToDb(dbConn, {
                    contactId: contactId,
                    message: encryptedMessage,
                    messageNonce: nonce,
                    messageType: messageType,
                    timestamp: timestamp
                })
            })
            .then(messageId => {
                this.props.saveMessageToState({
                    id: messageId,
                    contactId: contactId,
                    message: encryptedMessage,
                    messageNonce: decodedNonce,
                    messageType: messageType,
                    timestamp: timestamp,
                    decryptedMessage: message
                })

                this.setState({
                    message: "",
                    sendButtonloading: false
                }, () => SingleChatInput.buttonPressed = false)
            })
            .catch(err => {
                // console.log(err)
                SingleChatInput.buttonPressed = false
            })
    }

    onTextChange = (text) => {
        this.setState({
            message: text
        })
    }

    render() {
        let sendButton = (
            <TouchableOpacity onPress={this.onSendMessage}>
                <View style={styles.iconContainer}>
                    <Ionicons name="md-send" size={20} color={colors.white} style={styles.icon} />
                </View>
            </TouchableOpacity>
        )

        if (this.state.sendButtonloading) {
            sendButton = (
                <TouchableOpacity onPress={this.onSendMessage}>
                    <View style={styles.iconContainer}>
                        <ActivityIndicator size="small" color={colors.white} />
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <TextInput placeholder="Type your message" multiline onChangeText={this.onTextChange} value={this.state.message} />
                </View>
                {sendButton}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: colors.lightGray,
        margin: 10,
        padding: 10,
        borderRadius: 55,
        height: 55,
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center"
    },
    textInput: {
        fontSize: 14,
    },
    iconContainer: {
        backgroundColor: colors.blue,
        width: 35,
        height: 35,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },
    icon: {

    }
})

const mapStateToProps = state => {
    return {
        myPrivate: state.admin.admin.privateKey,
        myId: state.admin.admin.id,
        dbConn: state.database.conn,
        networkConnected: state.network.connected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveMessageToState: (data) => dispatch(insertMessageToState(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleChatInput)