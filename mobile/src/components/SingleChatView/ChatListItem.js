import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'

import colors from '../../../assets/colors'
import { decryptMessage } from '../../utils/crypto'
import { formatDate } from '../../utils/dateFormat'
import { MESSAGE_RECEIVED } from '../../utils/constants'
import { setMessagesToDelete } from '../../store/actions/delete'
import { setDecryptedMessages } from '../../store/actions/message'

class ChatListItem extends Component {

    shouldComponentUpdate = (nextProps, nextState) => {
        const { messagesToDelete, item } = this.props
        if (item !== nextProps.item) return true

        const { id } = this.props.item

        let selectedBefore = messagesToDelete && messagesToDelete[id]
        let selectedAfter = nextProps.messagesToDelete && nextProps.messagesToDelete[id]

        if (selectedBefore !== selectedAfter) return true

        return false
    }

    doDecrypt = () => {
        const { admin, item, decryptedMessages, setDecryptedMessages } = this.props
        const { message, message_nonce, public_key, decryptedMessage, id } = item

        if (decryptedMessage) {
            // when message is sent
            return decryptedMessage
        }

        if (decryptedMessages[id]) {
            // when is decrypted once before
            return decryptedMessages[id]
        }

        try {
            const decryptedMessage = decryptMessage(message, public_key, admin.private_key, message_nonce)
            setDecryptedMessages({
                ...decryptedMessages,
                [id]: decryptedMessage
            })
            return decryptedMessage
        } catch (error) {
            return 'Could not decrypt!'
        }
    }

    onLongPressMessage = () => {
        const { messagesToDelete, setMessagesToDelete } = this.props
        const { id } = this.props.item

        let selected = messagesToDelete && messagesToDelete[id]

        if (selected) {
            // unselect
            const newObj = { ...messagesToDelete }
            delete newObj[id]
            setMessagesToDelete(newObj)
        } else {
            // select
            setMessagesToDelete({ ...messagesToDelete, [id]: true })
        }
    }

    onPressMessage = () => {
        const { messagesToDelete, setMessagesToDelete } = this.props
        const { id } = this.props.item

        let selected = messagesToDelete && messagesToDelete[id]

        if (!messagesToDelete || Object.keys(messagesToDelete).length === 0) {
            return
        }

        if (selected) {
            // unselect
            const newObj = { ...messagesToDelete }
            delete newObj[id]
            setMessagesToDelete(newObj)
        } else {
            // select
            setMessagesToDelete({ ...messagesToDelete, [id]: true })
        }
    }

    render() {
        const { messagesToDelete } = this.props
        const { message_type, timestamp, id } = this.props.item

        let selected = messagesToDelete && messagesToDelete[id]

        return (
            <TouchableOpacity onPress={this.onPressMessage} onLongPress={this.onLongPressMessage}>
                <View style={styles.container}>
                    {
                        message_type === MESSAGE_RECEIVED ?
                            <View style={selected ? styles.innerContainerReceivedSelected : styles.innerContainerReceived}>
                                <View style={styles.messageContainer}>
                                    <Text style={styles.messageText}>{this.doDecrypt()}</Text>
                                </View>
                                <View style={styles.timestampContainer}>
                                    <Text style={styles.timestampText}>{formatDate(timestamp, true)}</Text>
                                </View>
                            </View> :
                            <View style={styles.innerContainerSent}>
                                <LinearGradient
                                    colors={selected ? [colors.gray.one, colors.gray.one] : [colors.pink.two, colors.pink.four]}
                                    start={[0, 1]}
                                    end={[1, 0]}
                                    style={styles.gradientContainerSent}>
                                    <View style={styles.messageContainer}>
                                        <Text style={styles.messageText}>{this.doDecrypt()}</Text>
                                    </View>
                                    <View style={styles.timestampContainer}>
                                        <Text style={styles.timestampText}>{formatDate(timestamp, true)}</Text>
                                    </View>
                                </LinearGradient>
                            </View>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    innerContainerReceived: {
        paddingLeft: 20,
        width: '80%',
        alignSelf: 'flex-start',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        padding: 10,
        backgroundColor: colors.white.one,
        flexDirection: 'row'
    },
    innerContainerReceivedSelected: {
        paddingLeft: 20,
        width: '80%',
        alignSelf: 'flex-start',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        padding: 10,
        backgroundColor: colors.black.two + '50',
        flexDirection: 'row'
    },
    innerContainerSent: {
        width: '80%',
        alignSelf: 'flex-end',
        borderRadius: 5,
        borderTopRightRadius: 0,
        overflow: 'hidden'
    },
    gradientContainerSent: {
        paddingLeft: 20,
        overflow: 'hidden',
        padding: 10,
        flexDirection: 'row'
    },
    messageContainer: {
        flex: 1
    },
    timestampContainer: {
        paddingLeft: 5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    messageText: {
        fontSize: 15,
        color: colors.black.one,
    },
    timestampText: {
        fontSize: 13,
        color: colors.black.two
    }
})

const mapStateToProps = state => {
    return {
        admin: state.admin.data,
        messagesToDelete: state.delete.messageIds,
        decryptedMessages: state.messages.decryptedMessages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMessagesToDelete: data => dispatch(setMessagesToDelete(data)),
        setDecryptedMessages: decryptedMessages => dispatch(setDecryptedMessages(decryptedMessages))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatListItem)