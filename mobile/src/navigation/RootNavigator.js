import React from 'react'
import { createSwitchNavigator, createAppContainer } from "react-navigation"
import { enableScreens } from 'react-native-screens'

// screens
import LoginScreen from '../screens/LoginScreen'
import SplashScreen from '../screens/SplashScreen'
import AccountSetupScreen from '../screens/AccountSetupScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import MainAppStack from './MainAppStack'

enableScreens()

const RootNavigator = createSwitchNavigator({
    LoginScreen: LoginScreen,
    SplashScreen: SplashScreen,
    WelcomeScreen: WelcomeScreen,
    AccountSetupScreen: AccountSetupScreen,
    MainAppStack: MainAppStack,
}, {
    initialRouteName: "SplashScreen"
})

export default createAppContainer(RootNavigator)