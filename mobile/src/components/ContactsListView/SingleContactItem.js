import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'

import colors from '../../../assets/colors'
import { setContactsToDelete } from '../../store/actions/delete'

class SingleContactItem extends Component {

    openProfile = () => {
        const { navigation, id } = this.props
        navigation.navigate('ContactProfileScreen', { id })
    }

    onLongPressContact = () => {
        const { contactsToDelete, setContactsToDelete, id } = this.props

        let selected = selected = contactsToDelete && contactsToDelete[id]

        if (selected) {
            // unselect
            const newObj = { ...contactsToDelete }
            delete newObj[id]
            setContactsToDelete(newObj)
        } else {
            // select
            setContactsToDelete({ ...contactsToDelete, [id]: true })
        }
    }

    onPressContact = () => {
        const { contactsToDelete, setContactsToDelete, navigation, id } = this.props

        let selected = contactsToDelete && contactsToDelete[id]

        if (!contactsToDelete || Object.keys(contactsToDelete).length === 0) {
            navigation.navigate('SingleChatScreen', { id })
            return
        }

        if (selected) {
            // unselect
            const newObj = { ...contactsToDelete }
            delete newObj[id]
            setContactsToDelete(newObj)
        } else {
            // select
            setContactsToDelete({ ...contactsToDelete, [id]: true })
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        const { contactsToDelete, id } = this.props

        let selectedBefore = contactsToDelete && contactsToDelete[id]
        let selectedAfter = nextProps.contactsToDelete && nextProps.contactsToDelete[id]

        if (id !== nextProps.id) return true
        if (selectedBefore !== selectedAfter) return true

        return false
    }


    render() {
        const { name, image, contactsToDelete, id } = this.props

        let selected = contactsToDelete && contactsToDelete[id]

        return (
            <TouchableOpacity onPress={this.onPressContact} onLongPress={this.onLongPressContact}>
                <View style={styles.itemContainer}>
                    <View style={selected ? styles.itemInnerContainerSelected : styles.itemInnerContainer}>
                        <View style={styles.itemLeftContainer}>
                            <TouchableOpacity onPress={this.openProfile}>
                                <LinearGradient
                                    colors={[colors.pink.four, colors.pink.two, colors.pink.one]}
                                    style={styles.imageContainer}
                                    start={[0, 1]}
                                    end={[1, 0]}>
                                    <Image source={{ uri: image }}
                                        style={styles.image}
                                        resizeMode='cover' />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemRightContainer}>
                            <Text style={styles.nameText}>{name}</Text>
                        </View>
                    </View>
                    {Platform.OS !== 'android' ? <View style={styles.shadowView}></View> : null}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
    },
    itemInnerContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.white.one
    },
    itemInnerContainerSelected: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.gray.one
    },
    itemLeftContainer: {
        padding: 10,
        paddingRight: 30,
        paddingLeft: 20
    },
    itemRightContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    imageContainer: {
        borderRadius: 35,
        overflow: 'hidden',
        width: 70,
        height: 70,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    image: {
        width: 60,
        height: 60
    },
    nameText: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.black.one
    },
    shadowView: {
        position: 'absolute',
        zIndex: -1,
        bottom: 10,
        left: 25,
        width: '90%',
        height: 5,
        backgroundColor: 'black',
        shadowColor: '#0037A2',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
    }
})

const mapStateToProps = state => {
    return {
        contactsToDelete: state.delete.contactIds
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setContactsToDelete: data => dispatch(setContactsToDelete(data))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SingleContactItem))