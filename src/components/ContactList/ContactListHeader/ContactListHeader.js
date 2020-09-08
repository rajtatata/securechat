import React, { Component } from 'react'
import { connect, batch } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import { deselectAllContactsToDelete } from '../../../store/actions/delete'
import { deleteContacts as deleteContactsFromState } from '../../../store/actions/contacts'
import { deleteChats as deleteChatsFromState } from '../../../store/actions/messages'
import { deleteContacts as deleteContactsFromDb, deleteChats as deleteChatsFromDb } from '../../../util/database'

class ContactListHeader extends Component {

    navigateToAddContact = () => {
        if (getItemPressed()) {
            return
        }
        
        setItemPressed(true)
        this.props.navigation.push("AddNewContact")
    }

    deselectAll = () => {
        this.props.deselectAllContactsToDelete()
    }

    deleteContacts = () => {
        const { contactsToDelete, dbConn, deselectAllContactsToDelete, deleteContactsFromState, deleteChatsFromState } = this.props
        const contactIds = []
        Object.keys(contactsToDelete).map(elem => {
            if (contactsToDelete[elem]) {
                contactIds.push(elem)
            }
        })

        deleteChatsFromDb(dbConn, contactIds)
            .then(() => {
                return deleteContactsFromDb(dbConn, contactIds)
            })
            .then(() => {
                batch(() => {
                    deleteChatsFromState(contactIds)
                    deleteContactsFromState(contactIds)
                    deselectAllContactsToDelete()
                })
            })
            .catch(err => {
                // console.log(err)
            })
    }

    render() {
        const { contactsToDelete } = this.props
        let selectedContacts = 0
        for (let key in contactsToDelete) {
            if (contactsToDelete[key]) {
                selectedContacts += 1
            }
        }

        const addNewIcon = (
            <TouchableOpacity onPress={this.navigateToAddContact}>
                <View style={styles.iconContainer}>
                    <Ionicons name="md-person-add" size={32} color={colors.black} />
                </View>
            </TouchableOpacity>
        )

        const selectionCounter = (
            <View style={styles.selectCounterContainer}><Text style={styles.selectCounterText}>{selectedContacts}</Text></View>
        )

        const deleteIcon = (
            <TouchableOpacity onPress={this.deleteContacts}>
                <View style={styles.iconContainer}>
                    <Ionicons name="md-trash" size={32} color={colors.red} />
                </View>
            </TouchableOpacity>
        )

        const deselectIcon = (
            <TouchableOpacity onPress={this.deselectAll}>
                <View style={styles.iconContainer}>
                    <Ionicons name="md-close" size={32} color={colors.black} />
                </View>
            </TouchableOpacity>
        )

        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.titleText}>Contacts</Text>
                </View>
                <View style={styles.rightContainer}>
                    {selectedContacts > 0 ? null : addNewIcon}
                    {selectedContacts > 0 ? selectionCounter : null}
                    {selectedContacts > 0 ? deleteIcon : null}
                    {selectedContacts > 0 ? deselectIcon : null}
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftContainer: {
        marginLeft: 17,
    },
    rightContainer: {
        flexDirection: "row",
        marginRight: 17,
    },
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        color: colors.black
    },
    iconContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 10
    },
    selectCounterContainer: {
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lightBlue,
        justifyContent: "center",
        alignItems: "center"
    },
    selectCounterText: {
        fontSize: 12,
        color: colors.black,
        fontWeight: "bold",
    }
})

const mapStateToProps = state => {
    return {
        dbConn: state.database.conn,
        contactsToDelete: state.delete.contactsToDelete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deselectAllContactsToDelete: () => dispatch(deselectAllContactsToDelete()),
        deleteContactsFromState: (contactIds) => dispatch(deleteContactsFromState(contactIds)),
        deleteChatsFromState: (contactIds) => dispatch(deleteChatsFromState(contactIds)),
    }
}

const getItemPressed = () => {
    return ContactListHeader.itemPressed
}

export const setItemPressed = (itemPressed) => {
    ContactListHeader.itemPressed = itemPressed
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ContactListHeader))