import React from 'react'
import { createAppContainer, createMaterialTopTabNavigator } from "react-navigation"
import { Ionicons } from '@expo/vector-icons'

import colors from '../../../assets/predefinedColors/predefinedColors'

// navigations
import ChatListStack from '../ChatListStack/ChatListStack'
import ContactListStack from '../ContactListStack/ContactListStack'
import MyProfileStack from '../MyProfileStack/MyProfileStack'

const MainTabs = createMaterialTopTabNavigator({
  Chat: {
    screen: ChatListStack,
    navigationOptions: {
      tabBarIcon: (<Ionicons name="md-apps" size={30} color={colors.blue} />)
    },
  },
  Contacts: {
    screen: ContactListStack,
    navigationOptions: {
      tabBarIcon: (<Ionicons name="md-contacts" size={30} color={colors.blue} />)
    },
  },
  MyProfile: {
    screen: MyProfileStack,
    navigationOptions: {
      tabBarIcon: (<Ionicons name="md-person" size={30} color={colors.blue} />)
    },
  },
},
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: colors.black,
      inactiveTintColor: colors.white,
      pressColor: colors.lightBlue,
      style: {
        backgroundColor: colors.white
      },
      indicatorStyle: {
        backgroundColor: colors.blue
      }
    }
  })

export default createAppContainer(MainTabs)