import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { withNavigation } from 'react-navigation'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import BackButton from '../../BackButton/BackButton'

class SettingsHeader extends Component {

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {

        const title = (
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Settings</Text>
            </View>
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
    rightContainer: {
        marginRight: 17,
    },
    titleContainer: {
        justifyContent: "center",
        marginLeft: 20,
    },
    titleText: {
        textAlignVertical: "center",
        fontSize: 20,
        color: colors.black,
        fontWeight: "bold",
    },
    backButtonContainer: {
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
    },
    feedbackContainer: {
        marginLeft: 8,
        borderRadius: 20,
        justifyContent: "center",
        overflow: "hidden",
    },
    buttonTitleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
})

export default withNavigation(SettingsHeader)