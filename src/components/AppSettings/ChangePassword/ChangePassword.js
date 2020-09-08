import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import nacl from 'tweet-nacl-react-native-expo'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import { updateAdminPassCode } from '../../../util/database'
import { encryptPrivateKey } from '../../../util/encryption'

class ChangePassword extends Component {

    state = {
        loading: false,
        password: "",
        confirmPassword: "",
        viewMarginBottom: 0
    }

    _keyboardDidShow = (e) => {
        const keyboardHeight = e.endCoordinates.height

        this.setState({
            viewMarginBottom: keyboardHeight
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            viewMarginBottom: 0
        })
    }

    componentDidMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
    }

    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    onPasswordChange = (text) => {
        this.setState({
            password: text
        })
    }

    onConfirmPasswordChange = (text) => {
        this.setState({
            confirmPassword: text
        })
    }

    settingsView = () => {
        this.props.changeView("settings")
    }

    clearFields = () => {
        this.setState({
            password: "",
            confirmPassword: "",
        }, () => {
            this.passwordInput.focus()
        })
    }

    onSubmit = () => {
        const { password, confirmPassword } = this.state
        const { adminPrivate, changeView, dbConn } = this.props

        if (password !== confirmPassword) {
            alert("Error: Passwords not the same!")
            this.clearFields()
        } else if (password === "") {
            alert("Error: Password cannot be empty!")
            this.clearFields()
        } else {
            this.setState({
                loading: true
            }, () => {
                encryptPrivateKey(adminPrivate, password)
                    .then(({ encryptedPrivateKey, nonce }) => {
                        return updateAdminPassCode(dbConn, {
                            privateKey: nacl.util.encodeBase64(encryptedPrivateKey),
                            privateKeyNonce: nacl.util.encodeBase64(nonce)
                        })
                    })
                    .then(() => {
                        changeView("settings")
                    })
                    .catch(err => {
                        // console.log(err)
                    })
            })
        }
    }

    render() {
        let submitButton = (
            <TouchableOpacity onPress={this.onSubmit}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Submit</Text>
                </View>
            </TouchableOpacity>
        )
        if (this.state.loading) {
            submitButton = (
                <View style={styles.buttonContainer}>
                    <ActivityIndicator size="small" color={colors.white} />
                </View>
            )
        }
        return (
            <View style={[styles.container, { marginBottom: this.state.viewMarginBottom }]}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTextHeading}>Chose a Master password</Text>
                    <Text style={styles.infoText}>This password will encrypt your private key, make sure to choose a strong password, and don't forget it or you will lose your messages</Text>
                    <Text style={[styles.infoText, { marginTop: 5 }]}>THIS ENCRYPTION WILL ADD EXTRA SECURITY IF SOMEONE GETS ACCESS TO YOUR PHONE</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputItemContainer}>
                        <TextInput style={styles.inputItem}
                            placeholder="Password"
                            value={this.state.password}
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={this.onPasswordChange}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.confirmPasswordInput.focus()}
                            ref={elem => this.passwordInput = elem} />
                    </View>
                    <View style={styles.inputItemContainer}>
                        <TextInput style={styles.inputItem}
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={this.onConfirmPasswordChange}
                            ref={elem => this.confirmPasswordInput = elem}
                            blurOnSubmit={false}
                            onSubmitEditing={this.onSubmit} />
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={this.settingsView}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                    {submitButton}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    infoContainer: {
        alignItems: "center",
        padding: 20,
    },
    infoTextHeading: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.black,
        textAlign: "center"
    },
    infoText: {
        fontSize: 12,
        color: colors.darkBlack,
        textAlign: "center"
    },
    inputContainer: {
        width: "100%",
        padding: 20,
    },
    inputItemContainer: {
        padding: 10,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 2,
    },
    inputItem: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.black,
    },
    buttonsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: colors.blue,
    },
    buttonText: {
        fontSize: 12,
        color: colors.white,
        textAlign: "center",
        fontWeight: "bold"
    }
})

const mapStateToProps = state => {
    return {
        adminPrivate: state.admin.admin.privateKey,
        dbConn: state.database.conn
    }
}

export default connect(mapStateToProps, null)(ChangePassword)