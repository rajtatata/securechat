import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, RefreshControl } from 'react-native'
import { connect } from 'react-redux'

import GradientBackground from '../GradientBackground/GradientBackground'
import ChatListItem from './ChatListItem'
import { getChats } from '../../store/actions/message'
import colors from '../../../assets/colors'
import { REFRESH_CHATS } from '../../utils/constants'
import InvisibleComponent from '../InvisibleComponent/InvisibleComponent'

class ChatListView extends Component {
    componentDidMount = () => {
        const { getChats } = this.props
        getChats()
    }

    onRefresh = () => {
        const { getChats } = this.props
        getChats()
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        const { chats, refreshing } = this.props
        if (refreshing !== nextProps.refreshing) return true
        if (chats !== nextProps.chats) return true
        return false
    }

    render() {
        const { chats, refreshing } = this.props
        return (
            <GradientBackground style={styles.container}>
                <InvisibleComponent />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={colors.black.one} />} >
                    {
                        !chats || chats.length === 0 ?
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: colors.black.two, fontWeight: '500' }}>No chats</Text>
                            </View> :
                            chats.map((chat, index) => {
                                return (
                                    <ChatListItem key={index} chat={chat} />
                                )
                            })
                    }
                </ScrollView>
            </GradientBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
})

const mapStateToProps = state => {
    return {
        chats: state.messages.chats,
        refreshing: state.loaders.refreshing[REFRESH_CHATS]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getChats: () => dispatch(getChats())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatListView)