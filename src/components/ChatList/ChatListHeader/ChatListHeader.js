import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

import { deselectAllChatsToDelete } from '../../../store/actions/delete'
import { deleteChats as deleteChatsFromState } from '../../../store/actions/messages'
import { deleteChats as deleteChatsFromDb } from '../../../util/database'
import colors from '../../../../assets/predefinedColors/predefinedColors'

class ChatListHeader extends Component {

    navigateToContacts = () => {
        this.props.navigation.navigate('Contacts')
    }

    deselectAll = () => {
        this.props.deselectAllChatsToDelete()
    }

    deleteChats = () => {
        const { chatsToDelete, dbConn, deselectAllChatsToDelete, deleteChatsFromState } = this.props
        const contactIds = []
        Object.keys(chatsToDelete).map(elem => {
            if (chatsToDelete[elem]) {
                contactIds.push(elem)
            }
        })

        deleteChatsFromDb(dbConn, contactIds)
            .then(() => {
                deleteChatsFromState(contactIds)
                deselectAllChatsToDelete()
            })
            .catch(err => {
                // console.log(err)
            })
    }

    render() {
        const { chatsToDelete } = this.props
        let selectedChats = 0
        for (let key in chatsToDelete) {
            if (chatsToDelete[key]) {
                selectedChats += 1
            }
        }

        const newMessageIcon = (
            <TouchableOpacity onPress={this.navigateToContacts}>
                <View style={styles.iconContainer}>
                    <Ionicons name="md-add" size={32} color={colors.black} />
                </View>
            </TouchableOpacity>
        )

        const selectionCounter = (
            <View style={styles.selectCounterContainer}><Text style={styles.selectCounterText}>{selectedChats}</Text></View>
        )

        const deleteIcon = (
            <TouchableOpacity onPress={this.deleteChats}>
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
                    <Text style={styles.titleText} >Chat</Text>
                </View>
                <View style={styles.rightContainer}>
                    {selectedChats > 0 ? null : newMessageIcon}
                    {selectedChats > 0 ? selectionCounter : null}
                    {selectedChats > 0 ? deleteIcon : null}
                    {selectedChats > 0 ? deselectIcon : null}
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
        color: colors.black,
        fontWeight: "bold",
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
        chatsToDelete: state.delete.chatsToDelete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deselectAllChatsToDelete: () => dispatch(deselectAllChatsToDelete()),
        deleteChatsFromState: (contactIds) => dispatch(deleteChatsFromState(contactIds)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ChatListHeader))