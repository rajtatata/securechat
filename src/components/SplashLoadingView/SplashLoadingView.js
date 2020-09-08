import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Text, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import nacl from 'tweet-nacl-react-native-expo'
import { withNavigation } from 'react-navigation'

import colors from '../../../assets/predefinedColors/predefinedColors'

import { setContacts } from '../../store/actions/contacts'
import { setMessages } from '../../store/actions/messages'
import { setDbConnection } from '../../store/actions/database'
import { setAdmin } from '../../store/actions/admin'

import { initializeDatabase, getAdmin, getContacts, getMessages, resetDb } from '../../util/database'
import { decryptPrivateKey } from '../../util/encryption'
import { parseAdmin } from '../../util/admin'
import { parseContacts } from '../../util/contact'
import { parseMessages } from '../../util/message'

class SplashLoadingView extends Component {
    state = {
        askForPassword: false,
        password: null,
        admin: null,
        resetLoading: false,
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

    getAdmin = () => {
        return initializeDatabase()
            .then(dbConn => {
                this.props.setDbConnection(dbConn)
                this.getMessagesAndContacts(dbConn)
                return getAdmin(dbConn)
            })
    }

    getMessagesAndContacts = (dbConn) => {
        getContacts(dbConn)
            .then(result => {
                if (result.length !== 0) {
                    this.props.setContacts(parseContacts(result._array))
                } else {
                    this.props.setContacts({})
                }
                return getMessages(dbConn)
            })
            .then(result => {
                if (result.length !== 0) {
                    const { messageArray, contactMessages } = parseMessages(result._array)
                    this.props.setMessages(messageArray, contactMessages)
                } else {
                    this.props.setMessages({}, {})
                }
            })
            .catch(err => {
                // console.log(err)
            })
    }

    componentDidMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)

        this.getAdmin()
            .then(admin => {
                if (admin.length === 0) {
                    this.props.navigation.navigate("WelcomeScreen")
                } else {
                    this.setState({
                        admin: parseAdmin(admin._array[0]),
                        askForPassword: true
                    }, () => {
                        this.passwordInput.focus()
                    })
                }
            })
            .catch(err => {
                // console.log(err)
            })
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    onPasswordSubmit = () => {
        const { password, admin } = this.state

        const publicKey = nacl.util.decodeBase64(admin.publicKey)
        const privateKey = nacl.util.decodeBase64(admin.privateKey)
        const privateKeyNonce = nacl.util.decodeBase64(admin.privateKeyNonce)

        decryptPrivateKey(privateKey, password, privateKeyNonce)
            .then(privateKey => {
                if (!privateKey) {
                    alert("Password Incorrect!")
                    this.setState({
                        password: ""
                    }, () => {
                        this.passwordInput.focus()
                    })
                } else {
                    this.setState(prevState => {
                        return {
                            admin: {
                                ...prevState.admin,
                                publicKey: publicKey,
                                privateKey: privateKey
                            },
                            askForPassword: false,
                        }
                    }, () => {
                        this.props.setAdmin(this.state.admin)
                        this.props.navigation.navigate("MainApp")
                    })
                }
            })
            .catch(err => {
                // console.log(err)
            })
    }

    onPasswordTextChange = (text) => {
        this.setState({
            password: text
        })
    }

    resetApp = () => {
        const { dbConn, navigation } = this.props

        this.setState({
            resetLoading: true
        }, () => {
            resetDb(dbConn)
                .then(() => {
                    return initializeDatabase()
                })
                .then(dbConn => {
                    this.props.setDbConnection(dbConn)
                    this.props.setMessages({}, {})
                    this.props.setContacts({})
                    navigation.navigate("WelcomeScreen")
                })
                .catch(err => {
                    // console.log(err)
                })
        })
    }

    render() {
        let resetButton = (
            <View>
                <TouchableOpacity onPress={this.resetApp}>
                    <View style={styles.resetButtonContainer}>
                        <Text style={styles.resetText}>Reset App</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

        if (this.state.resetLoading) {
            resetButton = (
                <View style={styles.passwordSubmitButtonContainer}>
                    <ActivityIndicator size="small" color={colors.white} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={{ marginBottom: this.state.viewMarginBottom }}>
                    <ActivityIndicator size="large" color={colors.white} style={{ display: this.state.askForPassword ? "none" : "flex" }} />
                    <View style={[styles.passwordViewContainer, {
                        display: this.state.askForPassword ? "flex" : "none",
                        borderColor: this.state.askForPassword ? colors.white : colors.darkBlack,
                    }]}>
                        <Text style={styles.passwordInfoText}>Password required to decrypt private key</Text>
                        <View style={styles.passwordTextInputContainer}>
                            <TextInput
                                onChangeText={this.onPasswordTextChange}
                                value={this.state.password}
                                style={styles.passwordTextInput}
                                placeholder="password"
                                secureTextEntry={true}
                                autoCapitalize="none"
                                onSubmitEditing={this.onPasswordSubmit}
                                blurOnSubmit={false}
                                ref={elem => this.passwordInput = elem} />
                        </View>
                        <View style={styles.buttonsContainer}>
                            {resetButton}
                            <View>
                                <TouchableOpacity onPress={this.onPasswordSubmit}>
                                    <View style={styles.passwordSubmitButtonContainer}>
                                        <Text style={styles.passwordSubmitText}>Submit</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.darkBlack,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.white
    },
    passwordViewContainer: {
        borderWidth: 2,
        borderColor: colors.white,
        width: "60%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    passwordTextInput: {
        fontSize: 20,
        color: colors.black
    },
    passwordTextInputContainer: {
        backgroundColor: colors.white,
        padding: 10,
        marginBottom: 10
    },
    passwordSubmitButtonContainer: {
        backgroundColor: colors.white,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    passwordSubmitText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.black
    },
    passwordInfoText: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.white,
        textAlign: "center",
        marginBottom: 10
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    },
    resetButtonContainer: {
        backgroundColor: colors.red,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    resetText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.white
    },

})

const mapStateToProps = state => {
    return {
        dbConn: state.database.conn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDbConnection: (dbConn) => dispatch(setDbConnection(dbConn)),
        setAdmin: (admin) => dispatch(setAdmin(admin)),
        setContacts: (contacts) => dispatch(setContacts(contacts)),
        setMessages: (messages, contactMessages) => dispatch(setMessages(messages, contactMessages))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SplashLoadingView))