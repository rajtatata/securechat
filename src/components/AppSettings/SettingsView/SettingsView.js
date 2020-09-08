import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import colors from '../../../../assets/predefinedColors/predefinedColors'

class SettingsView extends Component {

    changePasswordView = () => {
        this.props.changeView("changePassword")
    }

    changeNameView = () => {
        this.props.changeView("changeName")
    }

    resetView = () => {
        this.props.changeView("reset")
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.changePasswordView}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Change Password</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.changeNameView}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Change Name Display</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.resetView}>
                    <View style={styles.itemContainer}>
                        <Text style={[styles.itemText, { color: colors.red }]}>Reset App</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    itemContainer: {
        // borderWidth: 2,
        // borderColor: "blue",
        width: "100%",
        padding: 10,

    },
    itemText: {
        fontSize: 15,
        fontWeight: "bold"
    }
})

export default SettingsView