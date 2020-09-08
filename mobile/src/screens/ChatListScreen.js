import React, { Component } from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'

import colors from '../../assets/colors'
import ChatListView from '../components/ChatListView/ChatListView'
import GradientBackground from '../components/GradientBackground/GradientBackground'
import HeaderRight from '../components/ChatListView/HeaderRight'

class ChatListScreen extends Component {

    state = {
        loading: true
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 200)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Messenger',
            headerRight: <HeaderRight />,
            headerStyle: {
                backgroundColor: colors.gray.two,
                elevation: 0,
                borderBottomWidth: 0
            },
            headerTintColor: colors.white.one,
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 35,
                color: colors.black.one
            },

        }
    }

    render() {
        const { loading } = this.state
        if (loading) {
            return (
                <GradientBackground style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}>
                    <ActivityIndicator size='large' color={colors.black.one} />
                </GradientBackground>)
        }
        return (
            <ChatListView />
        )
    }
}

export default ChatListScreen