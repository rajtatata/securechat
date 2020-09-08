import React, { Component } from 'react'

import ChangeNameView from '../components/SettingsView/ChangeNameView'
import colors from '../../assets/colors'

class ChangeNameScreen extends Component {
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
            <ChangeNameView />
        )
    }
}

export default ChangeNameScreen