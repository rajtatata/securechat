import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import * as SplashScreen from 'expo-splash-screen'

import { initDb } from '../../store/actions/database'
import { getAdmin } from '../../store/actions/admin'
import { getSettings } from '../../store/actions/settings'

class SplashView extends Component {

    shouldComponentUpdate = (nextProps, nextState) => {
        return false
    }

    componentDidMount = async () => {
        if (SplashScreen) {
            await SplashScreen.preventAutoHideAsync()
        }

        const { initDb, getAdmin, navigation, getSettings } = this.props

        initDb()
        getAdmin()
        getSettings()

        setTimeout(() => {
            if (this.props.admin) {
                navigation.navigate('LoginScreen')
            } else {
                navigation.navigate('WelcomeScreen')
            }
            if (SplashScreen) {
                SplashScreen.hideAsync()
            }
        }, 1500)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image source={require('../../../assets/splash.png')}
                    resizeMode='cover' style={{ width: '100%', height: '100%' }} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        admin: state.admin.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initDb: () => dispatch(initDb()),
        getAdmin: () => dispatch(getAdmin()),
        getSettings: () => dispatch(getSettings()),
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SplashView))