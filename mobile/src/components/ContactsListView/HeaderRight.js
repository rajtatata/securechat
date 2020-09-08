import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import colors from '../../../assets/colors'
import { setContactsToDelete } from '../../store/actions/delete'
import { setLoading } from '../../store/actions/loaders'
import { deleteContacts } from '../../store/actions/contact'
import { DELETING_CONTACTS } from '../../utils/constants'

class HeaderRight extends Component {

    onXPress = () => {
        const { setContactsToDelete } = this.props
        setContactsToDelete({})
    }

    onDeletePress = () => {
        const { setContactsToDelete, contactsToDelete, deleteContacts, setLoading } = this.props
        setLoading(true, DELETING_CONTACTS)
        deleteContacts(contactsToDelete)
        setContactsToDelete({})
        setLoading(false, DELETING_CONTACTS)
    }

    addNewContactScreen = () => {
        const { navigation } = this.props
        navigation.navigate('AddNewContactScreen')
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        const { contactsToDelete, loading } = this.props
        if (contactsToDelete !== nextProps.contactsToDelete) return true
        if (loading !== nextProps.loading) return true
        return false
    }

    render() {
        const { contactsToDelete, loading } = this.props

        const selectedLength = Object.keys(contactsToDelete).length

        if (contactsToDelete && selectedLength > 0) {
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
                <TouchableOpacity onPress={this.addNewContactScreen}>
                    <View style={styles.iconContainer}>
                        <Ionicons name='ios-person-add' size={30} color={colors.black.one} />
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
    },
    iconContainer: {
        padding: 5,
        paddingRight: 20,
        paddingLeft: 20,
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
        contactsToDelete: state.delete.contactIds,
        loading: state.loaders.loading[DELETING_CONTACTS]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setContactsToDelete: data => dispatch(setContactsToDelete(data)),
        deleteContacts: data => dispatch(deleteContacts(data)),
        setLoading: (loading, name) => dispatch(setLoading(loading, name))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(HeaderRight))