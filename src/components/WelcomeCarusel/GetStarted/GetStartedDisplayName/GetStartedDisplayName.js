import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'

import colors from '../../../../../assets/predefinedColors/predefinedColors'

class GetStartedDisplayName extends Component {

    onDisplayNameChangeText = (event) => {
        this.props.setDisplayName(event)
    }

    onSubmit = () => {
        this.props.onTextInputSubmit()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTextHeading}>Chose a display name</Text>
                    <Text style={styles.infoText}>It doesn't have to be your real name ;)</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputItemContainer}>
                        <TextInput style={styles.inputItem}
                            placeholder="Display Name"
                            underlineColorAndroid="transparent"
                            onChangeText={this.onDisplayNameChangeText}
                            onSubmitEditing={this.onSubmit} />
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
    },
    infoContainer: {
        alignItems: "center",
        padding: 20
    },
    infoTextHeading: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.white
    },
    infoText: {
        fontSize: 12,
        color: colors.lightGray
    },
    inputContainer: {
        width: "100%",
        padding: 20,
    },
    inputItemContainer: {
        padding: 10,
        borderBottomColor: colors.white,
        borderBottomWidth: 2,
    },
    inputItem: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.white,
    }
})

export default GetStartedDisplayName