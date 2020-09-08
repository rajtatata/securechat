import React, { Component } from 'react'

import ChangePasswordView from '../components/SettingsView/ChangePasswordView'
import colors from '../../assets/colors'

class ChangePasswordScreen extends Component {
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
            <ChangePasswordView />
        )
    }
}

export default ChangePasswordScreen