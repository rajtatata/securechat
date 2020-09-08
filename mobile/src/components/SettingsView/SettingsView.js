import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import Constants from 'expo-constants'

import colors from '../../../assets/colors'
import GradientBackground from '../GradientBackground/GradientBackground'
import { setShowAlert, setAlertOptions } from '../../store/actions/alert'
import { reset } from '../../store/actions/database'
import AcceptNotifications from './AcceptNotifications'
import BackgroundLock from './BackgroundLock'

class SettingsView extends Component {

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

    openChangeName = () => {
        const { navigation } = this.props
        navigation.navigate('ChangeNameScreen')
    }

    openChangePicture = () => {
        const { navigation } = this.props
        navigation.navigate('ChangePictureScreen')
    }

    openChangePassword = () => {
        const { navigation } = this.props
        navigation.navigate('ChangePasswordScreen')
    }

    render() {
        return (
            <GradientBackground>
                <View style={styles.container}>

                    <View style={styles.itemContainer}>
                        <BackgroundLock />
                    </View>

                    <View style={styles.itemContainer}>
                        <AcceptNotifications />
                    </View>

                    <TouchableOpacity onPress={this.openChangeName}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Change Name</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.openChangePicture}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Change Picture</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.openChangePassword}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Change Password</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.resetApp}>
                        <View style={styles.itemContainer}>
                            <Text style={[styles.itemText, { color: colors.pink.one }]}>Reset App</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </GradientBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    itemContainer: {
        padding: 10,
        borderColor: colors.gray.one,
        borderBottomWidth: 0.2,
    },
    itemText: {
        fontSize: 18,
        color: colors.black.one
    }
})

const mapDispatchToProps = dispatch => {
    return {
        setShowAlert: (show) => dispatch(setShowAlert(show)),
        setAlertOptions: (data) => dispatch(setAlertOptions(data)),
        reset: (installationId) => dispatch(reset(installationId))
    }
}

export default withNavigation(connect(null, mapDispatchToProps)(SettingsView))