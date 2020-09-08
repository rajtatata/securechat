import React, { Component } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import { messageType } from '../../../util/message'
import { decryptMessage } from '../../../util/encryption'
import { dateFormat } from '../../../util/dateFormatter'
import { setDecryptedMessage } from '../../../store/actions/messages'
import { showAlert, removeAlert } from '../../../store/actions/alert'
import { selectMessageToDelete, deselectMessageToDelete } from '../../../store/actions/delete'

class SingleChatListItem extends Component {

    shouldComponentUpdate = (nextProps) => {
        const { messageId, message, messagesToDelete } = this.props

        if (messageId !== nextProps.messageId || message !== nextProps.message) {
            return true
        }

        const selectedBefore = messageId in messagesToDelete && messagesToDelete[messageId]
        const selectedAfter = messageId in nextProps.messagesToDelete && nextProps.messagesToDelete[messageId]
        if (selectedBefore !== selectedAfter) {
            return true
        }

        return false
    }

    componentDidMount = () => {
        const { contact, message, adminPrivateKey, messageId } = this.props
        setTimeout(() => {
            if (message && !message.decryptedMessage && contact) {
                decryptMessage(message.message, contact.publicKey, adminPrivateKey, message.messageNonce)
                    .then(decryptedMessage => {
                        this.props.setDecryptedMessage(messageId, decryptedMessage)
                    })
                    .catch(() => {
                        if (!this.props.alert.shown) {
                            this.props.showAlert()

                            Alert.alert(
                                "Error Decrypting",
                                "Oops! Could not decrypt message, maybe you and your contact have wrong keys. You are advised to delete the contact and add him again",
                                [
                                    { text: "OK", onPress: () => { this.props.removeAlert() } }
                                ],
                                {
                                    cancelable: false
                                }
                            )
                        }
                    })
            }
        }, 10)
    }

    onPress = () => {
        const { deselectMessageToDelete, messageId, messagesToDelete, selectMessageToDelete } = this.props
        let selectedMessages = 0
        for (let key in messagesToDelete) {
            if (messagesToDelete[key]) {
                selectedMessages += 1
            }
        }

        if (messageId in messagesToDelete && messagesToDelete[messageId]) { // if current is already selected, we deselect
            deselectMessageToDelete(messageId)
        } else if (selectedMessages > 0) { // if others are selected, we should select current
            selectMessageToDelete(messageId)
        } else {
            // no selections made, do nothing
        }
    }

    onLongPress = () => {
        const { messageId, selectMessageToDelete, messagesToDelete } = this.props
        if (messageId in messagesToDelete && messagesToDelete[messageId]) {
            // if current is selected do nothing
        } else {
            selectMessageToDelete(messageId)
        }
    }

    render() {
        const { message, messageId, messagesToDelete } = this.props
        if (!message || !messageId) {
            return null
        }

        const messageTypeSentReceived = message.messageType === messageType.sent ? "sent" : "received"
        let messageRender = <ActivityIndicator size="small" color={message.messageType === messageType.sent ? colors.white : colors.black} />

        const selected = messageId in messagesToDelete && messagesToDelete[messageId]

        if (message.decryptedMessage) {
            messageRender = <Text style={[styles.defaultTextMessage, styles[messageTypeSentReceived + "TextMessage"]]}>{message.decryptedMessage}</Text>
        }

        return (
            <TouchableOpacity onPress={this.onPress} onLongPress={this.onLongPress}>
                <View style={[styles.container, { backgroundColor: selected ? colors.lighterGray : colors.white }]}>
                    <View style={[styles.defaultMessageContainer, styles[messageTypeSentReceived + "MessageContainer"]]}>
                        {messageRender}
                    </View>
                    <View style={[styles.defaultTimeContainer, styles[messageTypeSentReceived + "TimeContainer"]]}>
                        <Text style={styles.defaultTextTime}>{dateFormat(message.timestamp, true)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    defaultMessageContainer: {
        width: "70%",
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 7,
        padding: 10,
    },
    sentMessageContainer: {
        alignSelf: "flex-end",
        alignItems: "flex-end",
        marginRight: 10,
        backgroundColor: colors.blue,
    },
    receivedMessageContainer: {
        marginLeft: 10,
        backgroundColor: colors.lightGray,
    },
    defaultTextMessage: {
        fontSize: 14,
    },
    sentTextMessage: {
        color: colors.white
    },
    receivedTextMessage: {
        color: colors.lightBlack
    },
    defaultTimeContainer: {

    },
    sentTimeContainer: {
        marginRight: 10,
        alignSelf: "flex-end",
        alignItems: "flex-end",
    },
    receivedTimeContainer: {
        marginLeft: 10,
    },
    defaultTextTime: {
        fontSize: 12,
        color: colors.gray
    }
})

const mapStateToProps = (state, ownProps) => {
    let message = null
    if (state.messages.list[ownProps.messageId]) {
        message = state.messages.list[ownProps.messageId]
    }

    return {
        message: message,
        adminPrivateKey: state.admin.admin.privateKey,
        alert: state.alert,
        messagesToDelete: state.delete.messagesToDelete
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDecryptedMessage: (messageId, decryptedMessage) => dispatch(setDecryptedMessage(messageId, decryptedMessage)),
        showAlert: () => dispatch(showAlert()),
        removeAlert: () => dispatch(removeAlert()),
        selectMessageToDelete: (messageId) => dispatch(selectMessageToDelete(messageId)),
        deselectMessageToDelete: (messageId) => dispatch(deselectMessageToDelete(messageId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleChatListItem)