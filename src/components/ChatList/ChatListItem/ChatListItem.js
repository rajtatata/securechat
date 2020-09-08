import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import { messageType } from '../../../util/message'
import { decryptMessage } from '../../../util/encryption'
import { dateFormat } from '../../../util/dateFormatter'
import { setDecryptedMessage } from '../../../store/actions/messages'
import { showAlert, removeAlert } from '../../../store/actions/alert'
import { selectChatToDelete, deselectChatToDelete } from '../../../store/actions/delete'

class ChatListItem extends Component {

    componentDidUpdate = () => {
        setTimeout(this.decryptLastMessage, 10)
    }

    shouldComponentUpdate = (nextProps) => {
        const { contactId, contact, chatsToDelete, lastMessage, newMessages } = this.props

        if (contactId !== nextProps.contactId || contact !== nextProps.contact) {
            return true
        }

        if (lastMessage.message !== nextProps.lastMessage.message || lastMessage.messageId !== nextProps.lastMessage.messageId) {
            return true
        }

        if (newMessages !== nextProps.newMessages) {
            return true
        }

        const selectedBefore = contactId in chatsToDelete && chatsToDelete[contactId]
        const selectedAfter = contactId in nextProps.chatsToDelete && nextProps.chatsToDelete[contactId]
        if (selectedBefore !== selectedAfter) {
            return true
        }

        return false
    }

    onPress = () => {
        if (getItemPressed()) {
            return
        }

        setItemPressed(true)

        const { deselectChatToDelete, contactId, chatsToDelete, selectChatToDelete } = this.props
        let selectedChats = 0
        for (let key in chatsToDelete) {
            if (chatsToDelete[key]) {
                selectedChats += 1
            }
        }

        if (contactId in chatsToDelete && chatsToDelete[contactId]) { // if current is already selected, we deselect
            deselectChatToDelete(contactId)
            setItemPressed(false)
        } else if (selectedChats > 0) { // if others are selected, we should select current
            selectChatToDelete(contactId)
            setItemPressed(false)
        } else { // no selections made, just perform the action
            this.goToSingleChat()
        }
    }

    onPressContactMissing = () => {
        if (getItemPressed()) {
            return
        }

        setItemPressed(true)

        const { deselectChatToDelete, contactId, chatsToDelete, selectChatToDelete } = this.props
        let selectedChats = 0
        for (let key in chatsToDelete) {
            if (chatsToDelete[key]) {
                selectedChats += 1
            }
        }

        if (contactId in chatsToDelete && chatsToDelete[contactId]) { // if current is already selected, we deselect
            deselectChatToDelete(contactId)
            setItemPressed(false)
        } else if (selectedChats > 0) { // if others are selected, we should select current
            selectChatToDelete(contactId)
            setItemPressed(false)
        } else {
            setItemPressed(false)
        }
    }

    onLongPress = () => {
        const { contactId, selectChatToDelete, chatsToDelete } = this.props
        if (contactId in chatsToDelete && chatsToDelete[contactId]) {
            // if current is selected do nothing
        } else {
            selectChatToDelete(contactId)
        }
    }

    goToSingleChat = () => {
        this.props.navigation.push("SingleChat", {
            contactId: this.props.contactId,
            contact: this.props.contact
        })
    }

    formatMaxChars = (text, maxChars = 30) => {
        const temp = text.split("\n").join(" ")

        if (temp.length <= maxChars) {
            return temp
        }

        return temp.substring(0, maxChars) + "..."
    }

    decryptLastMessage = () => {
        const { contact, lastMessage, admin } = this.props
        if (lastMessage.message && !lastMessage.message.decryptedMessage && contact) {
            decryptMessage(lastMessage.message.message, contact.publicKey, admin.privateKey, lastMessage.message.messageNonce)
                .then(decryptedMessage => {
                    this.props.setDecryptedMessage(lastMessage.messageId, decryptedMessage)
                })
                .catch(() => {
                    if (!this.props.alert.shown) {
                        this.props.showAlert()

                        Alert.alert(
                            "Error Decrypting",
                            "Oops! Could not decrypt message, maybe you and your contact have wrong keys. You are advised to delete the contact and add him again",
                            [
                                { text: "OK", onPress: () => this.props.removeAlert() }
                            ],
                            {
                                cancelable: false
                            }
                        )
                    }
                })
        }
    }

    componentDidMount = () => {
        setTimeout(this.decryptLastMessage, 10)
    }

    render() {
        const { contact, lastMessage, contactId, chatsToDelete, newMessages } = this.props

        if (!(contactId && lastMessage.messageId && lastMessage.message)) {
            return null
        }

        const selected = contactId in chatsToDelete && chatsToDelete[contactId]

        if (!contact) {
            return (
                <TouchableOpacity onPress={this.onPressContactMissing} onLongPress={this.onLongPress}>
                    <View style={[styles.container, { backgroundColor: selected ? colors.lighterGray : colors.white }]}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.imagePreview}
                                source={require('../../../../assets/defaultUserImage.png')} />
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.infoUserName, { fontWeight: newMessages > 0 ? "bold" : "normal" }]}>id: ({contactId})</Text>
                            <Text style={styles.infoLastMessage}>This contact is trying to send you messages but he is not in your list. Please add him!</Text>
                        </View>
                        <View style={styles.notificationContainer}>
                            <Text style={[
                                styles.notificationLastMessageTime,
                                {
                                    color: newMessages > 0 ? colors.black : colors.gray,
                                    fontWeight: newMessages > 0 ? "bold" : "normal",
                                }
                            ]}>
                                {dateFormat(lastMessage.message.timestamp)}
                            </Text>
                            <View style={[styles.notificationCounterContainer, { display: newMessages > 0 ? "flex" : "none" }]}>
                                <Text style={styles.notificationCounter}>{newMessages}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

        let lastMessageString = <View><ActivityIndicator size="small" color={colors.black} /></View>
        if (lastMessage.message.decryptedMessage) {
            lastMessageString = lastMessage.message.messageType === messageType.sent ? this.formatMaxChars("You: " + lastMessage.message.decryptedMessage) : this.formatMaxChars(lastMessage.message.decryptedMessage)
            lastMessageString = <Text style={styles.infoLastMessage} >{lastMessageString}</Text>
        }

        return (
            <TouchableOpacity onPress={this.onPress} onLongPress={this.onLongPress}>
                <View style={[styles.container, { backgroundColor: selected ? colors.lighterGray : colors.white }]}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.imagePreview}
                            source={{ uri: contact.avatar }}
                            defaultSource={require('../../../../assets/defaultUserImage.png')} />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.infoUserName, { fontWeight: newMessages > 0 ? "bold" : "normal" }]}>{contact.fullName}</Text>
                        {lastMessageString}
                    </View>
                    <View style={styles.notificationContainer}>
                        <Text style={[
                            styles.notificationLastMessageTime,
                            {
                                color: newMessages > 0 ? colors.black : colors.gray,
                                fontWeight: newMessages > 0 ? "bold" : "normal",
                            }
                        ]}>
                            {dateFormat(lastMessage.message.timestamp)}
                        </Text>
                        <View style={[styles.notificationCounterContainer, { display: newMessages > 0 ? "flex" : "none" }]}>
                            <Text style={styles.notificationCounter}>{newMessages}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 15,
        paddingTop: 15
    },
    imageContainer: {
        marginLeft: 20,
        overflow: 'hidden',
    },
    imagePreview: {
        width: 55,
        height: 55,
    },
    infoContainer: {
        flex: 1,
        flexDirection: "column",
        paddingLeft: 20,
    },
    infoUserName: {
        fontSize: 18,
        color: colors.black
    },
    infoLastMessage: {
        fontSize: 14,
        color: colors.gray
    },
    notificationContainer: {
        flexDirection: "column",
        marginRight: 15
    },
    notificationLastMessageTime: {
        fontSize: 12
    },
    notificationCounter: {
        color: colors.white,
        fontSize: 10,
        fontWeight: "bold",
    },
    notificationCounterContainer: {
        backgroundColor: colors.blue,
        borderRadius: 10,
        overflow: "hidden",
        paddingLeft: 7,
        paddingRight: 7,
        justifyContent: "center",
        alignItems: "center",
        height: 18,
        alignSelf: "flex-end"
    },
})

const getLastMessage = (contactId, messages, contactMessages) => {
    let messageId = null
    let message = null

    if (contactMessages[contactId] && contactMessages[contactId].length > 0) {
        messageId = Math.max(...contactMessages[contactId])
        message = messages[messageId]
    }
    return { messageId, message }
}

const mapStateToProps = (state, ownProps) => {
    let contact = null
    if (state.contacts.list[ownProps.contactId]) {
        contact = state.contacts.list[ownProps.contactId]
    }

    let newMessages = 0
    if (state.messageNotifications.notifications[ownProps.contactId]
        && state.messageNotifications.notifications[ownProps.contactId].counter) {
        newMessages = state.messageNotifications.notifications[ownProps.contactId].counter
    }

    return {
        lastMessage: getLastMessage(ownProps.contactId, state.messages.list, state.messages.contactMessages),
        contact: contact,
        alert: state.alert,
        chatsToDelete: state.delete.chatsToDelete,
        newMessages: newMessages,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDecryptedMessage: (messageId, decryptedMessage) => dispatch(setDecryptedMessage(messageId, decryptedMessage)),
        showAlert: () => dispatch(showAlert()),
        removeAlert: () => dispatch(removeAlert()),
        selectChatToDelete: (contactId) => dispatch(selectChatToDelete(contactId)),
        deselectChatToDelete: (contactId) => dispatch(deselectChatToDelete(contactId)),
    }
}

const getItemPressed = () => {
    return ChatListItem.itemPressed
}
export const setItemPressed = (itemPressed) => {
    ChatListItem.itemPressed = itemPressed
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ChatListItem))