import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import colors from '../../../assets/colors'
import { setMessagesToDelete } from '../../store/actions/delete'
import { deleteMessages } from '../../store/actions/message'
import { setLoading } from '../../store/actions/loaders'
import { DELETING_MESSAGES } from '../../utils/constants'

class HeaderRight extends Component {
    componentWillUnmount = () => {
        const { setMessagesToDelete } = this.props
        setMessagesToDelete({})
    }

    onXPress = () => {
        const { setMessagesToDelete } = this.props
        setMessagesToDelete({})
    }

    onDeletePress = () => {
        const { setMessagesToDelete, messagesToDelete, deleteMessages, setLoading } = this.props
        setLoading(true, DELETING_MESSAGES)
        deleteMessages(messagesToDelete)
        setMessagesToDelete({})
        setLoading(false, DELETING_MESSAGES)
    }

    openProfile = () => {
        const { navigation, contact_id } = this.props
        navigation.navigate('ContactProfileScreen', { id: contact_id })
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        const { avatar, messagesToDelete } = this.props

        if (avatar !== nextProps.avatar) return true
        if (messagesToDelete !== nextProps.messagesToDelete) return true

        return false
    }

    render() {
        const { avatar, messagesToDelete, loading } = this.props

        const selectedLength = Object.keys(messagesToDelete).length
        if (messagesToDelete && selectedLength > 0) {
            return (
                <View style={styles.container}>
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

        if (!avatar) {
            return null
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.openProfile}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: avatar }}
                            style={styles.image}
                            resizeMode='cover' />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    },
    imageContainer: {
        borderRadius: 50,
        overflow: 'hidden'
    },
    image: {
        width: 45,
        height: 45
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
        messagesToDelete: state.delete.messageIds,
        loading: state.loaders.loading[DELETING_MESSAGES]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMessagesToDelete: data => dispatch(setMessagesToDelete(data)),
        deleteMessages: data => dispatch(deleteMessages(data)),
        setLoading: (loading, name) => dispatch(setLoading(loading, name))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(HeaderRight))