import React, { Component } from 'react'

import ChangePictureView from '../components/SettingsView/ChangePictureView'
import colors from '../../assets/colors'

class ChangePictureScreen extends Component {
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
            <ChangePictureView />
        )
    }
}

export default ChangePictureScreen