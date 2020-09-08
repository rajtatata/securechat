import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'

import colors from '../../../../../assets/predefinedColors/predefinedColors'

class GetStartedPassword extends Component {
    state = {
        password: "",
        confirmPassword: ""
    }

    onPasswordChangeText = (event) => {
        this.props.setPassword(event)
    }

    onConfirmPasswordChangeText = (event) => {
        this.props.setConfirmPassword(event)
    }

    onPasswordSubmit = () => {
        this.confirmPasswordInput.focus()
    }

    onConfirmPasswordSubmit = () => {
        this.props.onTextInputSubmit()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTextHeading}>Chose a Master password</Text>
                    <Text style={styles.infoText}>This password will encrypt your private key, make sure to choose a strong password, and don't forget it or you will lose your messages</Text>
                    <Text style={[styles.infoText, { marginTop: 5 }]}>THIS ENCRYPTION WILL ADD EXTRA SECURITY IF SOMEONE GETS ACCESS TO YOUR PHONE</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputItemContainer}>
                        <TextInput style={styles.inputItem}
                            placeholder="Password"
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={this.onPasswordChangeText}
                            blurOnSubmit={false}
                            onSubmitEditing={this.onPasswordSubmit}
                            ref={elem => this.passwordInput = elem} />
                    </View>
                    <View style={styles.inputItemContainer}>
                        <TextInput style={styles.inputItem}
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={this.onConfirmPasswordChangeText}
                            onSubmitEditing={this.onConfirmPasswordSubmit}
                            ref={elem => this.confirmPasswordInput = elem} />
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
        padding: 20,
    },
    infoTextHeading: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.white,
        textAlign: "center"
    },
    infoText: {
        fontSize: 12,
        color: colors.lightGray,
        textAlign: "center"
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

export default GetStartedPassword