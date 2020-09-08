import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

import ChatList from '../../components/ChatList/ChatList'
import ChatListHeader from '../../components/ChatList/ChatListHeader/ChatListHeader'
import colors from '../../../assets/predefinedColors/predefinedColors'

class ChatListScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <ChatListHeader />,
            headerStyle: {
                backgroundColor: colors.white,
                elevation: 0,
                shadowColor: colors.white,
                borderBottomWidth: 0,
            }
        }
    }

    state = {
        chatlistComponent: false
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                chatlistComponent: true
            })
        }, 10)
    }

    render() {
        let chatlist = <ActivityIndicator size="large" color={colors.black} />
        if (this.state.chatlistComponent) {
            chatlist = <ChatList />
        }

        return (
            <View style={styles.container}>
                {chatlist}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
})

export default ChatListScreen