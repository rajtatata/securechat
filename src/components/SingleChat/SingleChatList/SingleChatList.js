import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Keyboard } from 'react-native'
import { connect, batch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import SingleChatListItem from '../SingleChatListItem/SingleChatListItem'
import colors from '../../../../assets/predefinedColors/predefinedColors'
import { clearNotificationCounter, setListenForNotificationChanges } from '../../../store/actions/messageNotifications'

class SingleChatList extends Component {

    shouldComponentUpdate = (nextProps, nextState) => {
        const { messages } = this.props
        const { scrollButtonStatus } = this.state

        if (scrollButtonStatus !== nextState.scrollButtonStatus) {
            return true
        }

        if (!messages && nextProps.messages) {
            return true
        }

        if (messages.length !== nextProps.messages.length) {
            return true
        }

        return false

    }

    state = {
        scrollButtonStatus: "scrollButtonContainerHidden",
        buttonClicked: false
    }

    componentDidMount = () => {
        batch(() => {
            this.props.clearNotificationCounter(this.props.contactId)
            this.props.setListenForNotificationChanges(this.props.contactId, false)
        })
    }

    componentWillUnmount = () => {
        this.props.setListenForNotificationChanges(this.props.contactId, true)
    }

    flatListOnScroll = (e) => {
        const deadZone = 35
        const currentPos = e.nativeEvent.contentOffset.y

        if (currentPos > deadZone) {
            if (!this.state.buttonClicked) {
                this.setState({
                    scrollButtonStatus: "scrollButtonContainerShown"
                })
            }
        } else {
            this.setState({
                scrollButtonStatus: "scrollButtonContainerHidden",
                buttonClicked: false
            })
        }
    }

    flatListScrollToEnd = () => {
        this.setState({
            scrollButtonStatus: "scrollButtonContainerHidden",
            buttonClicked: true
        }, () => this.flatList.scrollToOffset({ animated: true, offset: 0 }))
    }

    render() {
        const { messages, contact } = this.props

        if (!messages || messages.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <TouchableOpacity>
                        <View style={styles.emptyTextContainer}>
                            <Text style={styles.emptyText}>Start chating...</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View>
                <FlatList
                    data={messages.sort((a, b) => a < b)}
                    renderItem={data => (
                        <SingleChatListItem messageId={data.item} contact={contact} />
                    )}
                    keyExtractor={item => item.toString()}
                    ref={elem => this.flatList = elem}
                    inverted={true}
                    onScroll={this.flatListOnScroll}
                    windowSize={3}
                />
                <View style={styles[this.state.scrollButtonStatus]} ref={elem => this.scrollButtonContainer = elem}>
                    <TouchableOpacity onPress={this.flatListScrollToEnd}>
                        <View style={styles.scrollButton}>
                            <Ionicons name="md-arrow-down" size={16} color={colors.black} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        flexDirection: "column",
        padding: 20,
        flex: 1,
    },
    emptyTextContainer: {
        width: "100%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lighterGray
    },
    emptyText: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.black,
    },
    scrollButtonContainerHidden: {
        display: "none",
    },
    scrollButtonContainerShown: {
        position: "absolute",
        right: 10,
        bottom: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    scrollButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: colors.white + "80",
    }
})


const mapStateToProps = (state, ownProps) => {
    return {
        messages: state.messages.contactMessages[ownProps.contactId]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearNotificationCounter: (contactId) => dispatch(clearNotificationCounter(contactId)),
        setListenForNotificationChanges: (contactId, listen) => dispatch(setListenForNotificationChanges(contactId, listen)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleChatList)