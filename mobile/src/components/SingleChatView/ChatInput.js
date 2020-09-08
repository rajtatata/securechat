import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import colors from '../../../assets/colors'
import { setChatMessages, insertSentMessage } from '../../store/actions/message'
import { MESSAGE_SENT } from '../../utils/constants'
import { scrollViewRef, scrollToEnd } from './ScrollViewRef'

class ChatInput extends Component {

    state = {
        message: '',
        contact_public_key: null
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        const { message } = this.state
        if (message !== nextState.message) return true
        return false
    }

    componentDidMount = () => {
        const { contact_id, contacts } = this.props
        if (contacts) {
            const contact_public_key = contacts.find(el => el.id === contact_id).public_key
            this.setState({ contact_public_key })
        }
    }

    componentDidUpdate = () => {
        const { contact_public_key } = this.state
        const { contact_id, contacts } = this.props
        if (contacts && !contact_public_key) {
            const contact_public_key = contacts.find(el => el.id === contact_id).public_key
            this.setState({ contact_public_key })
        }
    }

    sendMessage = async () => {
        // send message
        const { message, contact_public_key } = this.state
        const { socket, setChatMessages, chatMessages, contact_id, insertSentMessage } = this.props

        if (message != '' && socket && contact_public_key) {
            insertSentMessage({
                message,
                contact_public_key,
                contact_id
            })

            setTimeout(() => {
                if (scrollViewRef) {
                    scrollToEnd({ animated: false })
                }
            }, 300)
        }

        this.setState({ message: '' })
    }

    focusOnInput = () => {
        this.messageInput.focus()
    }

    render() {
        const { loading } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <TouchableWithoutFeedback onPress={this.focusOnInput}>
                        <View style={styles.leftContainer}>
                            <TextInput
                                ref={ref => this.messageInput = ref}
                                placeholder="Send message"
                                style={styles.messageText}
                                multiline={true}
                                value={this.state.message}
                                onChangeText={value => this.setState({ message: value })} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.rightContainer}>
                        <TouchableOpacity onPress={this.sendMessage}>
                            <View style={styles.iconContainer}>
                                {
                                    loading ?
                                        <ActivityIndicator size='small' color={colors.black.one} /> :
                                        <Ionicons name="ios-send" size={30} color={colors.white.one} />}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    innerContainer: {
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
        paddingLeft: 20,
        backgroundColor: colors.white.one,
        borderRadius: 40,
        justifyContent: 'center',
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: colors.pink.one,
    },
    messageText: {
        fontSize: 15,
        color: colors.black.one,
    }
})

const mapStateToProps = state => {
    return {
        socket: state.socketio.socket,
        admin: state.admin.data,
        contacts: state.contacts.list,
        chatMessages: state.messages.chatMessages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setChatMessages: (data) => dispatch(setChatMessages(data)),
        insertSentMessage: data => dispatch(insertSentMessage(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput)