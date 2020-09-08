import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity, NetInfo } from 'react-native'
import { connect, batch } from 'react-redux'

import ChatListItem from './ChatListItem/ChatListItem'
import { connectRealtimeDb as connectRealtimeDbToState } from '../../store/actions/realtimeDb'
import { newMessage as insertMessageToState } from '../../store/actions/messages'
import { incrementNotificationCounter } from '../../store/actions/messageNotifications'
import { setNetworkConnection } from '../../store/actions/networkConnection'
import { connectRealtimeDb as connectToRealtimeDbServer, deleteMessage as deleteMessageFromServer } from '../../util/server'
import { insertMessage as insertMessageToDb } from '../../util/database'
import { messageType as messageTypes, parseNewMessage } from '../../util/message'
import { config } from '../../../messengerApp.config'
import '../../util/timerWarningFix'
import colors from '../../../assets/predefinedColors/predefinedColors'

class ChatList extends Component {

    shouldComponentUpdate = (nextProps) => {
        const { messages } = this.props

        if (Object.keys(messages).length !== Object.keys(nextProps.messages).length) {
            return true
        }

        return false
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.startRealtimeDb()
            NetInfo.isConnected.fetch().then((connected) => {
                this.props.setNetworkConnection(connected)
            })
            this.onConnectionChangeListener = NetInfo.isConnected.addEventListener('connectionChange', this.onNetworkConnectionChange)
        }, 10)
    }

    componentWillUnmount = () => {
        this.onConnectionChangeListener.remove()
    }

    startRealtimeDb = () => {
        if (!this.props.realtimeDb.connected) {
            const ref = "/" + config.realtimeDb.root + "/" + this.props.admin.id + "/"
            connectToRealtimeDbServer(ref)
                .then(dbRef => {
                    this.props.connectRealtimeDbToState()
                    dbRef.on('child_added', this.newMessageFromServer)
                })
                .catch(err => {
                    // console.log(err)
                })
        }
    }

    onNetworkConnectionChange = (connected) => {
        this.props.setNetworkConnection(connected)
    }

    newMessageFromServer = (snapshot) => {
        const newMessage = snapshot.val()

        const messageId = snapshot.key
        const contactId = newMessage.from
        const message = newMessage.message
        const messageNonce = newMessage.nonce
        const timestamp = newMessage.timestamp
        const messageType = messageTypes.received
        let messageDbId

        // insert to local db
        // delete from server
        // insert to state
        insertMessageToDb(this.props.dbConn, {
            contactId, message, messageNonce, timestamp, messageType
        }).then((id) => {
            messageDbId = id
            return deleteMessageFromServer(messageId, this.props.admin.id)
        }).then(() => {
            let notificationListener = this.props.messageNotifications[contactId] && ('listen' in this.props.messageNotifications[contactId]) ?
                this.props.messageNotifications[contactId].listen : true

            if (notificationListener) {
                batch(() => {
                    this.props.incrementNotificationCounter(contactId)
                    this.props.insertMessageToState(parseNewMessage({
                        contactId, message, messageNonce, timestamp, messageType, messageId: messageDbId
                    }))
                })
            } else {
                this.props.insertMessageToState(parseNewMessage({
                    contactId, message, messageNonce, timestamp, messageType, messageId: messageDbId
                }))
            }

        }).catch(err => {
            // console.log(err)
        })
    }

    render() {
        const { contactMessages, messages } = this.props
        let chatsAvailable = false

        if (Object.keys(contactMessages).length === 0) {
            chatsAvailable = false
        } else {
            Object.keys(contactMessages).some(contactId => {
                if (contactMessages[contactId].length > 0) {
                    chatsAvailable = true
                    return true
                }
            })
        }

        if (!chatsAvailable) {
            return (
                <View style={styles.emptyContainer}>
                    <TouchableOpacity>
                        <View style={styles.emptyTextContainer}>
                            <Text style={styles.emptyText}>Empty List</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <FlatList
                    data={Object.keys(contactMessages).sort((a, b) => {
                        const aLastMessage = getLastMessage(a, messages, contactMessages).message
                        const bLastMessage = getLastMessage(b, messages, contactMessages).message

                        return aLastMessage.timestamp < bLastMessage.timestamp
                    })}
                    renderItem={data => (
                        <ChatListItem contactId={data.item} admin={this.props.admin} />
                    )}
                    keyExtractor={item => item}
                    style={styles.list} />
            )
        }

    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        flexDirection: "column",
        padding: 20,
        flex: 1,
    },
    emptyTextContainer: {
        width: "100%",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lighterGray
    },
    emptyText: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.black,
    }
})

const getLastMessage = (contactId, messages, contactMessages) => {
    let messageId = null
    let message = null

    if (contactMessages[contactId] && contactMessages[contactId].length > 0) {
        messageId = contactMessages[contactId][contactMessages[contactId].length - 1]
        message = messages[messageId]
    }

    return { messageId, message }
}

const mapStateToProps = state => {
    return {
        messages: state.messages.list,
        contactMessages: state.messages.contactMessages,
        realtimeDb: state.realtimeDb,
        admin: state.admin.admin,
        dbConn: state.database.conn,
        messageNotifications: state.messageNotifications.notifications
    }
}

const mapDispatchToProps = dispatch => {
    return {
        connectRealtimeDbToState: () => dispatch(connectRealtimeDbToState()),
        insertMessageToState: (data) => dispatch(insertMessageToState(data)),
        setNetworkConnection: (connected) => dispatch(setNetworkConnection(connected)),
        incrementNotificationCounter: (contactId) => dispatch(incrementNotificationCounter(contactId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)