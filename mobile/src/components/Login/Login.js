import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import Constants from 'expo-constants'

import colors from '../../../assets/colors'
import GradientBackground from '../GradientBackground/GradientBackground'
import { decryptPrivateKey } from '../../utils/crypto'
import { setAdmin } from '../../store/actions/admin'
import { setShowAlert, setAlertOptions } from '../../store/actions/alert'
import { reset } from '../../store/actions/database'

class Login extends Component {

    state = {
        password: ''
    }

    openApp = async () => {
        const { password } = this.state
        const { navigation, admin, setAlertOptions, setShowAlert, setAdmin } = this.props

        try {
            if (!password || password === '') {
                setAlertOptions({
                    title: 'Error',
                    message: 'Password cannot be empty!',
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmText: 'OK',
                })
                setShowAlert(true)
            } else {
                const { private_key } = await decryptPrivateKey(admin.private_key, password, admin.private_key_nonce)
                setAdmin({
                    ...admin,
                    private_key: private_key
                })
                navigation.navigate('MainAppStack')
            }
        } catch (error) {
            setAlertOptions({
                title: 'Error',
                message: 'Password not correct!',
                showCancelButton: false,
                showConfirmButton: true,
                confirmText: 'OK',
            })
            setShowAlert(true)
            this.setState({ password: '' })
        }
    }

    resetApp = () => {
        const { reset, navigation, setShowAlert, setAlertOptions } = this.props
        setAlertOptions({
            title: 'Reset App',
            message: 'This will delete all your local data! Continue?',
            showCancelButton: true,
            showConfirmButton: true,
            onConfirmPressed: () => {
                setShowAlert(false)
                reset(Constants.installationId)
                navigation.navigate('SplashScreen')
            },
            confirmText: 'OK',
            cancelText: 'Cancel',
        })
        setShowAlert(true)
    }

    render() {
        return (
            <GradientBackground>
                <View style={styles.itemContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Unlock App</Text>
                    </View>
                    <View style={styles.inputOuterContainer}>
                        <View style={styles.inputInnerContainer}>
                            <TextInput style={styles.inputText}
                                placeholder='Password'
                                secureTextEntry={true}
                                autoFocus={true}
                                onSubmitEditing={this.openApp}
                                onChangeText={(value) => this.setState({ password: value })}
                                value={this.state.password} />
                        </View>
                    </View>
                    <View style={styles.buttonOuterContainer}>
                        <TouchableOpacity onPress={this.openApp}>
                            <View style={styles.buttonInnerContainer}>
                                <Text style={styles.buttonText}>Open App</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.resetButtonOuterContainer}>
                        <TouchableOpacity onPress={this.resetApp}>
                            <View style={styles.resetButtonInnerContainer}>
                                <Text style={{ fontSize: 14, color: colors.black.one }}>Forgot password? </Text>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.pink.one }}>Reset app</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </GradientBackground>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        paddingTop: 100,
        padding: 20,
    },
    titleContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    titleText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: colors.black.one
    },
    inputOuterContainer: {
        padding: 20,
        paddingTop: 30,
    },
    inputInnerContainer: {
        borderColor: colors.gray.one,
        borderBottomWidth: 1,
        padding: 10,
    },
    inputText: {
        fontSize: 16,
        color: colors.black.one
    },
    buttonOuterContainer: {
        paddingTop: 10,
    },
    buttonInnerContainer: {
        borderColor: colors.pink.one,
        borderWidth: 1.5,
        padding: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        width: '90%'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.pink.one
    },
    resetButtonOuterContainer: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resetButtonInnerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.pink.one
    }
})

const mapStateToProps = state => {
    return {
        admin: state.admin.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAdmin: (admin) => dispatch(setAdmin(admin)),
        setShowAlert: (show) => dispatch(setShowAlert(show)),
        setAlertOptions: (data) => dispatch(setAlertOptions(data)),
        reset: (installationId) => dispatch(reset(installationId))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Login))