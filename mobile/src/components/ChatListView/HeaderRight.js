import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import colors from '../../../assets/colors'
import { setChatsToDelete } from '../../store/actions/delete'
import { deleteChats } from '../../store/actions/message'
import { setLoading } from '../../store/actions/loaders'
import { DELETING_CHATS } from '../../utils/constants'

class HeaderRight extends Component {

    shouldComponentUpdate = (nextProps, nextState) => {
        const { newCounter, chatsToDelete, loading } = this.props
        if (newCounter !== nextProps.newCounter) return true
        if (chatsToDelete !== nextProps.chatsToDelete) return true
        if (loading !== nextProps.loading) return true
        return false
    }

    onXPress = () => {
        const { setChatsToDelete } = this.props
        setChatsToDelete({})
    }

    onDeletePress = async () => {
        const { setChatsToDelete, chatsToDelete, deleteChats, setLoading } = this.props
        setLoading(true, DELETING_CHATS)
        await deleteChats(chatsToDelete)
        setChatsToDelete({})
        setLoading(false, DELETING_CHATS)
    }

    render() {
        const { newCounter, chatsToDelete, loading } = this.props
        const selectedLength = Object.keys(chatsToDelete).length

        if (chatsToDelete && selectedLength > 0) {
            return (
                <View>
                    {
                        loading ?
                            <ActivityIndicator size='small' color={colors.black.one} /> :
                            <View style={styles.deleteOuterContainer}>
                                <TouchableOpacity onPress={this.onXPress}>
                                    <View style={styles.xContainer}>
                                        <Ionicons name='ios-close' size={35} color={colors.black.two} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onDeletePress}>
                                    <View style={styles.trashContainer}>
                                        <Ionicons name='ios-trash' size={35} color={colors.pink.one} />
                                        <View style={styles.trashCounterContainer}>
                                            <Text style={styles.trashCounterText}>{selectedLength}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                    }

                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={[styles.innerContainer, { display: newCounter > 0 ? 'flex' : 'none' }]}>
                    <Text style={styles.text}>{newCounter}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 5,
        right: 20,
    },
    innerContainer: {
        backgroundColor: colors.pink.one,
        padding: 10,
        borderRadius: 50,
        minWidth: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.white.one,
        fontSize: 25,
        fontWeight: 'bold',
    },
    deleteOuterContainer: {
        flexDirection: 'row'
    },
    xContainer: {
        paddingRight: 10,
        paddingLeft: 15,
    },
    trashContainer: {
        paddingLeft: 20,
        paddingRight: 10,
        marginRight: 10,
    },
    trashCounterContainer: {
        borderColor: colors.white.one,
        borderWidth: 0.5,
        backgroundColor: colors.pink.one,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 20,
        minWidth: 20,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    trashCounterText: {
        color: colors.white.one,
        fontSize: 12,
    }
})

const mapStateToProps = state => {
    return {
        newCounter: state.messages.newCounter,
        chatsToDelete: state.delete.chatIds,
        loading: state.loaders.loading[DELETING_CHATS]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setChatsToDelete: data => dispatch(setChatsToDelete(data)),
        deleteChats: contactIds => dispatch(deleteChats(contactIds)),
        setLoading: (loading, name) => dispatch(setLoading(loading, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRight)