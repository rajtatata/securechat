import React, { Component } from 'react'
import { connect } from 'react-redux'
import socketIO from 'socket.io-client'
import Constants from 'expo-constants'
import { Notifications } from 'expo'
import { AppState, Platform } from 'react-native'

import { BASE_URL } from '../../config/environment'
import { setSocket } from '../../store/actions/socketio'
import { insertReceivedMessage } from '../../store/actions/message'
import { MESSAGE_RECEIVED } from '../../utils/constants'
import { deleteMessage } from '../../services/network/message'
import { RESET } from '../../store/actions/actionTypes'
import { navigate } from '../../navigation/NavigationRef'

class InvisibleComponent extends Component {
    state = {
        appState: null,
        socket: null
    }

    componentDidMount = () => {
        if (Platform.OS === 'android') {
            Notifications.dismissAllNotificationsAsync()
        }
        this.initSocket(this.props.admin)
        this._notificationListener = Notifications.addListener(this._handleNotification)
        AppState.addEventListener('change', this._handleAppStateChange)
    }


    componentWillUnmount = () => {
        this.state.socket.disconnect()
        this._notificationListener.remove()
        AppState.removeEventListener('change', this._handleAppStateChange)
    }

    _handleAppStateChange = appState => {
        const { backgroundLock, backgroundReset } = this.props

        this.setState({ appState })

        if ((appState === 'background' || appState === 'inactive') && backgroundLock === 1) {
            backgroundReset()
            navigate('SplashScreen')
        }
    }

    _handleNotification = async notification => {
        const { notificationId } = notification
        const { appState } = this.state
        if (appState === 'background' || appState === 'inactive') {
            // show notification
        } else {
            Notifications.dismissNotificationAsync(notificationId)
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return false
    }

    initSocket = (admin) => {
        const { setSocket, insertReceivedMessage } = this.props
        const socket = socketIO(BASE_URL)
        const setState = (data) => this.setState(data)
        socket.connect()
        socket.on('connect', () => {
            setSocket(socket)
            setState({ socket })

            // send initialComm
            socket.emit('initialComm', admin.id)

            // read new messages list
            socket.on('newMessages', newMessages => {
                newMessages = JSON.parse(newMessages)
                newMessages.forEach(m => {
                    const { _id, to, message, nonce, from, timestamp } = m
                    insertReceivedMessage({
                        contact_id: from,
                        message,
                        message_nonce: nonce,
                        timestamp: new Date(timestamp).getTime(),
                        message_type: MESSAGE_RECEIVED,
                        seen: 0
                    })
                })
                deleteMessage({ userId: admin.id, installationId: Constants.installationId, messageIds: newMessages.map(m => m._id) })
            })

            // read new message single
            socket.on('newMessage', m => {
                m = JSON.parse(m)
                const { _id, to, message, nonce, from, timestamp } = m
                insertReceivedMessage({
                    contact_id: from,
                    message,
                    message_nonce: nonce,
                    timestamp: new Date(timestamp).getTime(),
                    message_type: MESSAGE_RECEIVED,
                    seen: 0,
                    alertFlag: true
                })
                deleteMessage({ userId: admin.id, installationId: Constants.installationId, messageIds: [_id] })
            })
        })
    }

    render() {
        return null
    }
}

const mapStateToProps = state => {
    return {
        admin: state.admin.data,
        socket: state.socketio.socket,
        backgroundLock: state.settings.backgroundLock
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSocket: socket => dispatch(setSocket(socket)),
        insertReceivedMessage: data => dispatch(insertReceivedMessage(data)),
        backgroundReset: () => dispatch((() => {
            return {
                type: RESET
            }
        })())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvisibleComponent)