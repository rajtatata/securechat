import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import BackButton from '../../BackButton/BackButton'
import { deselectAllMessagesToDelete } from '../../../store/actions/delete'
import { deleteMessages as deleteMessagesFromState } from '../../../store/actions/messages'
import { deleteMessages as deleteMessagesFromDb } from '../../../util/database'

class SingleChatHeader extends Component {

    goToContactProfile = () => {
        if (getItemPressed()) {
            return
        }

        setItemPressed(true)
        this.props.navigation.push("ContactProfile", {
            contactId: this.props.contactId,
            contact: this.props.contact,
        })
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    deselectAll = () => {
        this.props.deselectAllMessagesToDelete()
    }

    deleteMessages = () => {
        const { messagesToDelete, dbConn, deselectAllMessagesToDelete, deleteMessagesFromState, contactId } = this.props
        const messageIds = []

        Object.keys(messagesToDelete).map(elem => {
            if (messagesToDelete[elem]) {
                messageIds.push(elem)
            }
        })

        deleteMessagesFromDb(dbConn, messageIds)
            .then(() => {
                deleteMessagesFromState(contactId, messageIds)
                deselectAllMessagesToDelete()
                // console.log("deleting clicked")
            })
            .catch(err => {
                // console.log(err)
            })
    }

    render() {
        const { contact, messagesToDelete } = this.props
        let selectedMessages = 0
        for (let key in messagesToDelete) {
            if (messagesToDelete[key]) {
                selectedMessages += 1
            }
        }

        const title = (
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{contact.fullName}</Text>
            </View>
        )

        const image = (
            <TouchableOpacity onPress={this.goToContactProfile}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.imagePreview}
                        source={{ uri: contact.avatar }}
                        defaultSource={require('../../../../assets/defaultUserImage.png')} />
                </View>
            </TouchableOpacity>
        )

        const selectionCounter = (
            <View style={styles.selectCounterContainer}><Text style={styles.selectCounterText}>{selectedMessages}</Text></View>
        )

        const deleteIcon = (
            <TouchableOpacity onPress={this.deleteMessages}>
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

        let backButton = (
            <View style={styles.feedbackContainer}>
                <TouchableOpacity onPress={this.goBack}>
                    <View style={styles.buttonTitleContainer}>
                        <View style={styles.backButtonContainer}>
                            {BackButton}
                        </View>
                        {title}
                    </View>
                </TouchableOpacity>
            </View>
        )

        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    {backButton}
                </View>
                <View style={styles.rightContainer}>
                    {selectedMessages > 0 ? null : image}
                    {selectedMessages > 0 ? selectionCounter : null}
                    {selectedMessages > 0 ? deleteIcon : null}
                    {selectedMessages > 0 ? deselectIcon : null}
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
        justifyContent: "center",
    },
    feedbackContainer: {
        marginLeft: 8,
        justifyContent: "center",
        overflow: "hidden",
    },
    buttonTitleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    titleContainer: {
        justifyContent: "center",
        marginLeft: 20,
    },
    backButtonContainer: {
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
    },
    rightContainer: {
        flexDirection: "row",
        marginRight: 17,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.black,
    },
    imageContainer: {
        // borderRadius: 40,
        overflow: 'hidden',
    },
    imagePreview: {
        width: 40,
        height: 40,
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
        messagesToDelete: state.delete.messagesToDelete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deselectAllMessagesToDelete: () => dispatch(deselectAllMessagesToDelete()),
        deleteMessagesFromState: (contactId, messageIds) => dispatch(deleteMessagesFromState(contactId, messageIds)),
    }
}

const getItemPressed = () => {
    return SingleChatHeader.itemPressed
}

export const setItemPressed = (itemPressed) => {
    SingleChatHeader.itemPressed = itemPressed
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SingleChatHeader))