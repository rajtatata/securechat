import React from 'react'
import { createStackNavigator } from "react-navigation-stack"

// screens
import SingleChatScreen from '../screens/SingleChatScreen'
import AddNewContactScreen from '../screens/AddNewContactScreen'
import ContactProfileScreen from '../screens/ContactProfileScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ChangePictureScreen from '../screens/ChangePictureScreen'
import ChangeNameScreen from '../screens/ChangeNameScreen'
import ChangePasswordScreen from '../screens/ChangePasswordScreen'
import MainTabs from './MainTabs'

const MainAppStack = createStackNavigator({
    MainTabs: {
        screen: MainTabs,
        navigationOptions: {
            header: null,
            headerStyle: {
                backgroundColor: 'white'
            }
        }
    },
    SingleChatScreen: SingleChatScreen,
    AddNewContactScreen: AddNewContactScreen,
    ContactProfileScreen: ContactProfileScreen,
    SettingsScreen: SettingsScreen,
    ChangeNameScreen: ChangeNameScreen,
    ChangePictureScreen: ChangePictureScreen,
    ChangePasswordScreen: ChangePasswordScreen,
}, {
    initialRouteName: 'MainTabs'
})

export default MainAppStack