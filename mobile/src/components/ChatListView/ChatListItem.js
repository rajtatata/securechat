import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'

import colors from '../../../assets/colors'
import { formatDate } from '../../utils/dateFormat'
import { decryptMessage } from '../../utils/crypto'
import { MESSAGE_SENT } from '../../utils/constants'
import { setChatsToDelete } from '../../store/actions/delete'

class ChatListItem extends Component {
    shouldComponentUpdate = (nextProps, nextState) => {
        const { chatsToDelete, chat } = this.props
        const { contact_id } = chat

        let selectedBefore = chatsToDelete && chatsToDelete[contact_id]
        let selectedAfter = nextProps.chatsToDelete && nextProps.chatsToDelete[contact_id]

        if (chat !== nextProps.chat) return true
        if (selectedBefore !== selectedAfter) return true

        return false
    }

    doDecrypt = () => {
        const { admin, chat } = this.props
        const { message, message_nonce, public_key } = chat

        try {
            return this.formatMessage(decryptMessage(message, public_key, admin.private_key, message_nonce))
        } catch (error) {
            console.log(error)
            return 'Could not decrypt!'
        }
    }

    openProfile = () => {
        const { contact_id } = this.props.chat

        const { navigation } = this.props
        navigation.navigate('ContactProfileScreen', { id: contact_id })
    }

    formatMessage = (decryptedMessage) => {
        const { message_type } = this.props.chat
        const maxChars = 30

        const trimmedTxt = decryptedMessage.replace(/\n/g, ' ') // remove new lines which would ruin UI
        const firstPart = message_type === MESSAGE_SENT ? 'You: ' : ''
        const secondPart = trimmedTxt.substring(0, maxChars)
        const thirdPart = trimmedTxt.length > maxChars ? '...' : ''
        return firstPart + secondPart + thirdPart

    }

    onLongPressChat = () => {
        const { chatsToDelete, setChatsToDelete } = this.props
        const { contact_id } = this.props.chat
        let selected = chatsToDelete && chatsToDelete[contact_id]

        if (selected) {
            // unselect
            const newObj = { ...chatsToDelete }
            delete newObj[contact_id]
            setChatsToDelete(newObj)
        } else {
            // select
            setChatsToDelete({ ...chatsToDelete, [contact_id]: true })
        }
    }

    onPressChat = () => {
        const { chatsToDelete, setChatsToDelete, navigation } = this.props
        const { contact_id } = this.props.chat
        let selected = chatsToDelete && chatsToDelete[contact_id]

        if (!chatsToDelete || Object.keys(chatsToDelete).length === 0) {
            navigation.navigate('SingleChatScreen', { id: contact_id })
            return
        }

        if (selected) {
            // unselect
            const newObj = { ...chatsToDelete }
            delete newObj[contact_id]
            setChatsToDelete(newObj)
        } else {
            // select
            setChatsToDelete({ ...chatsToDelete, [contact_id]: true })
        }
    }

    render() {
        const { chatsToDelete } = this.props
        const { avatar, full_name, seen, timestamp, contact_id } = this.props.chat

        let selected = chatsToDelete && chatsToDelete[contact_id]

        return (
            <TouchableOpacity onPress={this.onPressChat} onLongPress={this.onLongPressChat}>
                <View style={selected ? styles.itemContainerSelected : styles.itemContainer}>
                    <View style={styles.itemLeftContainer}>
                        <TouchableOpacity onPress={this.openProfile}>
                            <LinearGradient
                                colors={[colors.pink.four, colors.pink.two, colors.pink.one]}
                                style={styles.imageContainer}
                                start={[0, 1]}
                                end={[1, 0]}>
                                <Image source={{ uri: avatar }}
                                    style={styles.image}
                                    resizeMode='cover' />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemMiddleContainer}>
                        <View>
                            <Text style={[styles.itemContactNameText, { color: seen === 0 ? colors.black.one : colors.black.two }]}>{full_name}</Text>
                        </View>
                        <View style={styles.itemMessageContainer}>
                            <Text style={[styles.itemMessageText, { color: seen === 0 ? colors.black.one : colors.black.two }]}>{this.doDecrypt()}</Text>
                        </View>
                    </View>
                    <View style={styles.itemRightContainer}>
                        <Text style={[styles.itemTimestampText, { color: seen === 0 ? colors.black.one : colors.black.two }]}>{formatDate(timestamp)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        width: '100%',
    },
    itemContainerSelected: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: colors.black.one + '30'
    },
    itemLeftContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 30
    },
    itemMiddleContainer: {
        flex: 1,
    },
    itemRightContainer: {
        marginRight: 15,
        marginLeft: 10,
        marginTop: 10
    },
    image: {
        width: 60,
        height: 60
    },
    imageContainer: {
        borderRadius: 35,
        overflow: 'hidden',
        width: 70,
        height: 70,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    itemContactNameText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.black.one
    },
    itemMessageContainer: {
        paddingTop: 5,
    },
    itemMessageText: {
        fontSize: 16,
        color: colors.black.one
    },
    itemTimestampText: {
        fontSize: 16,
        color: colors.black.one
    }
})

const mapStateToProps = state => {
    return {
        admin: state.admin.data,
        chatsToDelete: state.delete.chatIds
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setChatsToDelete: data => dispatch(setChatsToDelete(data))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ChatListItem))