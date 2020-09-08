import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

import colors from '../../../../assets/predefinedColors/predefinedColors'

class MyProfileHeader extends Component {

    goToSettings = () => {
        if (getItemPressed()) {
            return
        }
        setItemPressed(true)
        this.props.navigation.push("Settings")
    }

    render() {
        const icon = (
            <TouchableOpacity onPress={this.goToSettings}>
                <View style={styles.iconContainer}>
                    <Ionicons name="md-settings" size={32} color={colors.black} />
                </View>
            </TouchableOpacity>
        )

        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.titleText}>Edit profile</Text>
                </View>
                <View style={styles.rightContainer}>
                    {icon}
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
        marginRight: 17,
    },
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        color: colors.black
    },
    iconContainer: {
    }
})

const getItemPressed = () => {
    return MyProfileHeader.itemPressed
}

export const setItemPressed = (itemPressed) => {
    MyProfileHeader.itemPressed = itemPressed
}

export default withNavigation(MyProfileHeader)