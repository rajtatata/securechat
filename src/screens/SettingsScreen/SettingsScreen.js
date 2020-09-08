import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

import AppSettings from '../../components/AppSettings/AppSettings'
import SettingsHeader from '../../components/AppSettings/SettingsHeader/SettingsHeader'
import colors from '../../../assets/predefinedColors/predefinedColors'

class SettingsScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: SettingsHeader,
            headerStyle: {
                backgroundColor: colors.white,
                elevation: 0,
                shadowColor: colors.white,
                borderBottomWidth: 0,
            },
            headerBackTitle: null,
            headerBackImage: null,
            headerBackTitleVisible: false,
            headerLeft: null,
        }
    }

    state = {
        settingsComponent: false
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                settingsComponent: true
            })
        }, 10)
    }

    render() {
        let settings = <ActivityIndicator size="large" color={colors.black} />
        if (this.state.settingsComponent) {
            settings = <AppSettings />
        }
        return (
            <View style={styles.container}>
                {settings}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
})

export default SettingsScreen