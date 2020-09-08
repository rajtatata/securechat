import React, { Component } from 'react'
import { View, Keyboard } from 'react-native'

import GradientBackground from '../GradientBackground/GradientBackground'
import ChatList from './ChatList'
import ChatInput from './ChatInput'
import { scrollViewRef, scrollToEnd } from './ScrollViewRef'

class SingleChatView extends Component {

    state = {
        containerHeight: '100%',
        keyboardAvoidPadding: 0
    }

    _keyboardDidShow = (e) => {
        this.inputLayout.measure((x, y, width, height, pageX, pageY) => {
            const keyboardScreenY = e.endCoordinates.screenY

            this.setState({
                keyboardAvoidPadding: pageY - keyboardScreenY + height
            })

            setTimeout(() => {
                if (scrollViewRef) {
                    scrollToEnd({ animated: false })
                }
            }, 300)
        })
    }

    _keyboardDidHide = () => {
        this.setState({ keyboardAvoidPadding: 0 })
    }

    componentDidMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        )

        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        )
    }

    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    render() {
        const { contact_id } = this.props
        return (
            <GradientBackground
                style={{
                    width: '100%',
                    height: this.state.containerHeight,
                    paddingBottom: this.state.keyboardAvoidPadding
                }}
                onLayout={e => {
                    const { containerHeight } = this.state
                    const { height } = e.nativeEvent.layout

                    if (containerHeight === '100%') {
                        this.setState({ containerHeight: height })
                    }
                }}>
                <View style={{ flex: 1, width: '100%' }}>
                    <ChatList contact_id={contact_id} keyboardAvoidPadding={this.state.keyboardAvoidPadding} />
                </View>
                <View style={{ width: '100%' }}
                    ref={ref => this.inputLayout = ref}
                    onLayout={() => { /* do nothing, but important to call this */ }}>
                    <ChatInput contact_id={contact_id} />
                </View>
            </GradientBackground>
        )
    }
}

export default SingleChatView