import React, { Component } from 'react'

import SettingsView from '../components/SettingsView/SettingsView'
import colors from '../../assets/colors'

class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings',
            headerStyle: {
                backgroundColor: colors.gray.two,
                elevation: 0,
                borderBottomWidth: 0
            },
            headerTintColor: colors.black.one,
            headerTitleStyle: {
                fontSize: 20,
                color: colors.black.one
            },

        }
    }

    render() {
        return (
            <SettingsView />
        )
    }
}

export default SettingsScreen