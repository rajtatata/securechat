import React, { Component, createRef } from 'react'
import { FlatList, ActivityIndicator, Text, View, ScrollView, RefreshControl } from 'react-native'
import { connect } from 'react-redux'

import ChatListItem from './ChatListItem'
import { getChatMessages, setChatMessages, setDecryptedMessages, getChats } from '../../store/actions/message'
import colors from '../../../assets/colors'
import { scrollViewRef, scrollTo } from './ScrollViewRef'


class ChatList extends Component {
    state = {
        page: 0,
        refreshing: false,
        contentHeight: 0,
        loadingMore: true
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.props.messages !== nextProps.messages) {
            return true
        }

        return false
    }

    loadMoreData = () => {
        this.setState({ loadingMore: true })
        const { page } = this.state
        const { getChatMessages, contact_id, loadMore } = this.props
        if (loadMore) {
            this.setState({ refreshing: true })
            getChatMessages(contact_id, page)
            this.setState({ page: page + 1, refreshing: false })
        }
    }

    componentDidMount = () => {
        const { getChatMessages, contact_id } = this.props
        const { page } = this.state
        getChatMessages(contact_id, page)
        this.setState({ page: page + 1 })
    }

    componentWillUnmount = () => {
        const { setChatMessages, getChats } = this.props
        setChatMessages([])
        getChats()
    }

    render() {
        const { messages } = this.props

        if (messages && messages.length === 0) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: colors.black.two }}>No messages</Text>
                </View>)
        }

        if (!messages) {
            return <ActivityIndicator size='large' color={colors.black.one} />
        }

        return (
            <ScrollView
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.loadMoreData} tintColor="black" />}
                ref={scrollViewRef}
                onContentSizeChange={(_, newContentHeight) => {
                    const { contentHeight, loadingMore } = this.state
                    const diff = newContentHeight - contentHeight
                    if (loadingMore) {
                        scrollTo({ y: diff, animated: false })
                    }
                    this.setState({ contentHeight: newContentHeight, loadingMore: false })
                }}
            >
                {
                    messages.map((item, index) => {
                        return <ChatListItem key={index} item={item} />
                    })
                }
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages.chatMessages,
        loadMore: state.messages.loadMore,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getChatMessages: (contact_id, page) => dispatch(getChatMessages(contact_id, page)),
        setChatMessages: (data) => dispatch(setChatMessages(data)),
        setDecryptedMessages: (data) => dispatch(setDecryptedMessages(data)),
        getChats: () => dispatch(getChats())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)