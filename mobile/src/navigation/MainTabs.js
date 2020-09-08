import React from 'react'
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createStackNavigator } from "react-navigation-stack"
import { Ionicons } from '@expo/vector-icons'

import ChatListScreen from '../screens/ChatListScreen'
import ContactsScreen from '../screens/ContactsScreen'
import MyProfileScreen from '../screens/MyProfileScreen'

import colors from '../../assets/colors'

// icon with badge
// import MessageIconWithBadge from '../../components/IconWithBadge/MessageIconWithBadge'

// stacks are created to be able to configure headers for each tab
const MainTabs = createBottomTabNavigator({
    ChatListScreen: {
        screen: createStackNavigator({
            ChatListScreen: ChatListScreen
        }, {
            headerLayoutPreset: "left",
        }),
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name="ios-chatbubbles" size={25} color={tintColor} />),
            tabBarLabel: 'Chats'
        },
    },
    ContactsScreen: {
        screen: createStackNavigator({
            ContactsScreen: ContactsScreen
        }, {
            headerLayoutPreset: "left"
        }),
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name="md-contacts" size={25} color={tintColor} />),
            tabBarLabel: 'Contacts'
        },
    },
    MyProfileScreen: {
        screen: createStackNavigator({
            MyProfileScreen: MyProfileScreen
        }, {
            headerLayoutPreset: "left"
        }),
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name="md-person" size={25} color={tintColor} />),
            tabBarLabel: 'Profile'
        },
    },
},
    {
        tabBarOptions: {
            showLabel: true,
            showIcon: true,
            activeTintColor: colors.pink.one,
            inactiveTintColor: colors.gray.one,
            style: {
                backgroundColor: colors.white.one,
                borderTopColor: colors.gray.one,
            },
            labelStyle: {

            }
        }
    })

export default MainTabs