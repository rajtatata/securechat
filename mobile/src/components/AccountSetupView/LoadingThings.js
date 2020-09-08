import React, { Component } from 'react'
import Constants from 'expo-constants'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import colors from '../../../assets/colors'
import { signup } from '../../store/actions/admin'
import { generateKeys, encryptPrivateKey } from '../../utils/crypto'
import { navigate } from '../../navigation/NavigationRef'

class LoadingThings extends Component {

    state = {
        done: false
    }

    componentDidUpdate = async () => {
        const { done } = this.state
        const { startSignup, full_name, password, signup } = this.props
        if (startSignup && !done) {
            let expoPushToken = await this.askNotifPermissions()
            const { public_key, private_key } = await generateKeys()
            const encryptedPrivate = await encryptPrivateKey(private_key, password)
            const admin = {
                full_name,
                public_key,
                private_key: encryptedPrivate.private_key,
                privateKeyNonce: encryptedPrivate.nonce,
                expoPushToken,
                installationId: Constants.installationId
            }

            const result = await signup(admin)

            if (result) {
                this.setState({ done: true })
            } else {
                navigate('SplashScreen')
            }
        }
    }

    askNotifPermissions = async () => {
        let expoToken = 'none'
        if (Constants.isDevice) {
            try {
                await Permissions.askAsync(Permissions.NOTIFICATIONS)
                expoToken = await Notifications.getExpoPushTokenAsync()
            } catch (error) {
                console.log(error)
            }
        }
        return expoToken
    }

    openApp = () => {
        const { navigation } = this.props
        navigation.navigate('LoginScreen')
    }

    render() {
        const { done } = this.state
        return (
            <View style={styles.itemContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Getting things ready</Text>
                </View>
                <View style={styles.infoOuterContainer}>
                    <View style={[styles.infoInnerContainer, { display: done ? 'none' : 'flex' }]}>
                        <ActivityIndicator size='large' color={colors.black.one} />
                    </View>
                </View>
                <View style={[styles.buttonOuterContainer, { display: done ? 'flex' : 'none' }]}>
                    <TouchableOpacity onPress={this.openApp}>
                        <View style={styles.buttonInnerContainer}>
                            <Text style={styles.buttonText}>Open App</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        width: Dimensions.get('window').width,
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
    infoOuterContainer: {
        padding: 20,
        paddingTop: 30,
    },
    infoInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center'
    },
    infoText: {
        fontSize: 16,
        color: colors.black.one,
        marginRight: 15,
    },
    buttonOuterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    buttonInnerContainer: {
        borderColor: colors.pink.one,
        borderWidth: 1.5,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 60,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.pink.one
    }
})

const mapDispatchToProps = dispatch => {
    return {
        signup: (data) => dispatch(signup(data))
    }
}

export default withNavigation(connect(null, mapDispatchToProps)(LoadingThings))