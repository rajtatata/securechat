import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'

import AddNewContactGuideline from './AddNewContactGuideline/AddNewContactGuideline'
import AddNewContactQRScanner from './AddNewContactQRScanner/AddNewContactQRScanner'
import AddNewContactCancelButton from './AddNewContactCancelButton/AddNewContactCancelButton'
import { setItemPressed } from '../ContactList/ContactListHeader/ContactListHeader'

class AddNewContact extends Component {

    componentWillUnmount = () => {
        setItemPressed(false)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.guideLineContainer}>
                    <AddNewContactGuideline />
                </View>
                <AddNewContactQRScanner />
                <View style={styles.cancelButtonContainer} >
                    <AddNewContactCancelButton />
                </View>
                <StatusBar hidden />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    guideLineContainer: {
        position: "absolute",
        zIndex: 1,
    },
    cancelButtonContainer: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        zIndex: 1,
    }
})

export default AddNewContact