import React, { Component } from 'react'
import { View, StyleSheet, Keyboard } from 'react-native'

import SingleChatList from './SingleChatList/SingleChatList'
import SingleChatInput from './SingleChatInput/SingleChatInput'
import { setItemPressed as setItemPressedChat } from '../ChatList/ChatListItem/ChatListItem'
import { setItemPressed as setItemPressedContact } from '../ContactList/ContactListItem/ContactListItem'

class SingleChat extends Component {
    state = {
        keyboardAvoidingPadding: 0,
        inputLayoutFirstDisplay: false,
        inputLayoutScreenY: 0,
        inputLayoutHeight: 0,
    }

    keyboardShownHandler = (event) => {
        const keyboardScreenY = event.endCoordinates.screenY
        const { inputLayoutScreenY, inputLayoutHeight } = this.state
        const padding = inputLayoutScreenY - (keyboardScreenY - 1) + inputLayoutHeight

        this.setState({
            keyboardAvoidingPadding: padding
        })
    }

    keyboardHiddenHandler = (event) => {
        this.setState({
            keyboardAvoidingPadding: 0
        })
    }

    componentDidMount = () => {
        Keyboard.addListener('keyboardDidShow', this.keyboardShownHandler)
        Keyboard.addListener('keyboardDidHide', this.keyboardHiddenHandler)
    }

    componentWillUnmount = () => {
        setItemPressedChat(false)
        setItemPressedContact(false)
        Keyboard.removeListener('keyboardDidShow', this.keyboardShownHandler)
        Keyboard.removeListener('keyboardDidHide', this.keyboardHiddenHandler)
    }

    inputLayoutShownHandler = () => {
        // for handling keyboard avoidance 
        if (this.inputLayout && !this.state.inputLayoutFirstDisplay) {
            // page slides up like a modal, inputLayout detects wrong offsetY because it has not finished sliding
            // we wait a bit until all components are in place
            setTimeout(() => this.inputLayout.measure((x, y, width, height, pageX, pageY) => {
                this.setState({
                    inputLayoutFirstDisplay: true,
                    inputLayoutScreenY: pageY,
                    inputLayoutHeight: height
                })
            }), 220)
        }
    }

    render() {
        return (
            <View
                style={[
                    styles.container,
                    { paddingBottom: this.state.keyboardAvoidingPadding }
                ]}>
                <View style={styles.listContainer}>
                    <SingleChatList contactId={this.props.contactId} contact={this.props.contact} />
                </View>
                <View style={styles.inputContainer}
                    ref={ref => this.inputLayout = ref}
                    onLayout={this.inputLayoutShownHandler} >
                    <SingleChatInput contactId={this.props.contactId} contact={this.props.contact} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
    listContainer: {
        flex: 1,

    },
    inputContainer: {
        justifyContent: "flex-end"
    }
})

export default SingleChat