import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

import colors from '../../../assets/colors'
import GradientBackground from '../GradientBackground/GradientBackground'
import { setShowAlert, setAlertOptions } from '../../store/actions/alert'
import { updateAdmin as updateAdminDb, getAdmin as getAdminDb } from '../../services/database/admin'
import { decryptPrivateKey, encryptPrivateKey } from '../../utils/crypto'

class ChangePasswordView extends Component {
    state = {
        oldPassword: '',
        newPassword: ''
    }

    onSave = async () => {
        const { dbConn, navigation, setAlertOptions, setShowAlert } = this.props
        const { oldPassword, newPassword } = this.state
        if (oldPassword !== '' && newPassword !== '') {
            const admin = await getAdminDb(dbConn)
            try {
                const dec = decryptPrivateKey(admin.private_key, oldPassword, admin.private_key_nonce)
                const enc = await encryptPrivateKey(dec.private_key, newPassword)
                updateAdminDb(dbConn, {
                    private_key: enc.private_key,
                    privateKeyNonce: enc.nonce
                })
                navigation.goBack()
            } catch (error) {
                setAlertOptions({
                    title: 'Error',
                    message: 'Wrong password!',
                    showConfirmButton: true,
                    confirmText: 'OK',
                })
                setShowAlert(true)
            }
        } else {
            setAlertOptions({
                title: 'Error',
                message: 'Please fill both fields!',
                showConfirmButton: true,
                confirmText: 'OK',
            })
            setShowAlert(true)
        }
    }

    render() {
        return (
            <GradientBackground>
                <View style={styles.itemContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Change Password</Text>
                    </View>
                    <View style={styles.inputOuterContainer}>
                        <View style={styles.inputInnerContainer}>
                            <TextInput style={styles.inputText}
                                placeholder='Current password'
                                secureTextEntry={true}
                                autoFocus={true}
                                value={this.state.value}
                                onChangeText={value => this.setState({ oldPassword: value })}
                                onSubmitEditing={() => this.newPassword.focus()} />
                        </View>
                    </View>
                    <View style={styles.inputOuterContainer}>
                        <View style={styles.inputInnerContainer}>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.inputText}
                                ref={ref => this.newPassword = ref}
                                placeholder='New password'
                                value={this.state.value}
                                onChangeText={value => this.setState({ newPassword: value })}
                                onSubmitEditing={this.onSave} />
                        </View>
                    </View>
                    <View style={styles.buttonOuterContainer}>
                        <TouchableOpacity onPress={this.onSave}>
                            <View style={styles.buttonInnerContainer}>
                                <Text style={styles.buttonText}>Save</Text>
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
        paddingTop: 50,
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
})

const mapStateToProps = state => {
    return {
        dbConn: state.database.conn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setShowAlert: (show) => dispatch(setShowAlert(show)),
        setAlertOptions: (data) => dispatch(setAlertOptions(data)),
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ChangePasswordView))