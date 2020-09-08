import React from 'react'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation"
import { useScreens } from 'react-native-screens'

// navigations
import MainTabs from '../MainTabs/MainTabs'

// screens
import SingleChatScreen from '../../screens/SingleChatScreen/SingleChatScreen'
import ContactProfileScreen from '../../screens/ContactProfileScreen/ContactProfileScreen'
import AddNewContactScreen from '../../screens/AddNewContactScreen/AddNewContactScreen'
import SplashScreen from '../../screens/SplashScreen/SplashScreen'
import WelcomeScreen from '../../screens/WelcomeScreen/WelcomeScreen'
import SettingsScreen from '../../screens/SettingsScreen/SettingsScreen'

useScreens()

const stackNavigator = createStackNavigator({
    MainTabs: {
        screen: MainTabs,
        navigationOptions: {
            header: null
        }
    },
    SingleChat: {
        screen: SingleChatScreen,
    },
    ContactProfile: {
        screen: ContactProfileScreen
    },
    AddNewContact: {
        screen: AddNewContactScreen
    },
    Settings: {
        screen: SettingsScreen
    }
}, {
        initialRouteName: "MainTabs"
    })

const RootNavigator = createSwitchNavigator({
    SplashScreen: SplashScreen,
    WelcomeScreen: WelcomeScreen,
    MainApp: stackNavigator
}, {
        initialRouteName: "SplashScreen"
    })

export default createAppContainer(RootNavigator)