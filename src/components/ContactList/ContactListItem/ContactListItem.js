import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import { selectContactToDelete, deselectContactToDelete } from '../../../store/actions/delete'

class ContactListItem extends Component {

    shouldComponentUpdate = (nextProps) => {
        const { contactId, contact, searchString, contactsToDelete } = this.props

        if (contactId !== nextProps.contactId || contact !== nextProps.contact) {
            return true
        }

        const prevFilter = searchString && !contact.fullName.toLowerCase().includes(searchString)
        const nextFilter = nextProps.searchString && !contact.fullName.toLowerCase().includes(nextProps.searchString)

        if (nextFilter) {
            this.props.onListItemHidden() // fix for contact list result counter
        }

        // !prevFilter and !nextFilter will fix issues when vars are null or "", we need true/false values
        if (!prevFilter !== !nextFilter) {
            return true
        }

        const prevSelected = contactId in contactsToDelete && contactsToDelete[contactId]
        const nextSelected = contactId in nextProps.contactsToDelete && nextProps.contactsToDelete[contactId]
        if (prevSelected !== nextSelected) {
            return true
        }

        return false
    }

    openSingleChat = () => {
        this.props.navigation.push("SingleChat", {
            contactId: this.props.contactId,
            contact: this.props.contact
        })
    }

    onPress = () => {
        if (getItemPressed()) {
            return
        }

        setItemPressed(true)

        const { deselectContactToDelete, contactId, contactsToDelete, selectContactToDelete } = this.props
        let selectedContacts = 0
        for (let key in contactsToDelete) {
            if (contactsToDelete[key]) {
                selectedContacts += 1
            }
        }

        if (contactId in contactsToDelete && contactsToDelete[contactId]) { // if current is already selected, we deselect
            deselectContactToDelete(contactId)
            setItemPressed(false)
        } else if (selectedContacts > 0) { // if others are selected, we should select current
            selectContactToDelete(contactId)
            setItemPressed(false)
        } else { // no selections made, just perform the action
            this.openSingleChat()
        }
    }

    onLongPress = () => {
        const { contactId, selectContactToDelete, contactsToDelete } = this.props
        if (contactId in contactsToDelete && contactsToDelete[contactId]) {
            // if current is selected do nothing
        } else {
            selectContactToDelete(contactId)
        }
    }

    render() {
        const { contact, searchString, contactId, contactsToDelete } = this.props

        const selected = contactId in contactsToDelete && contactsToDelete[contactId]

        let display = "flex"
        if (searchString && !contact.fullName.toLowerCase().includes(searchString)) {
            display = "none"
        }

        return (
            <TouchableOpacity onPress={this.onPress} onLongPress={this.onLongPress}>
                <View style={[styles.container,
                {
                    display: display,
                    backgroundColor: selected ? colors.lighterGray : colors.white
                }]} >
                    <View style={styles.imageContainer}>
                        <Image style={styles.imagePreview} source={{ uri: contact.avatar }} defaultSource={require('../../../../assets/defaultUserImage.png')} />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoUserName}>{contact.fullName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 5,
        paddingTop: 5,
    },
    imageContainer: {
        marginLeft: 20,
        overflow: "hidden",
    },
    imagePreview: {
        width: 45,
        height: 45,

    },
    infoContainer: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 5,
    },
    infoUserName: {
        fontSize: 18,
        color: colors.black,
        fontWeight: "bold",
    }
})

const mapStateToProps = state => {
    return {
        contactsToDelete: state.delete.contactsToDelete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectContactToDelete: (contactId) => dispatch(selectContactToDelete(contactId)),
        deselectContactToDelete: (contactId) => dispatch(deselectContactToDelete(contactId)),
    }
}

const getItemPressed = () => {
    return ContactListItem.itemPressed
}
export const setItemPressed = (itemPressed) => {
    ContactListItem.itemPressed = itemPressed
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ContactListItem))