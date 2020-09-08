import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

import colors from '../../../assets/colors'

class HeaderRight extends Component {

    openSettings = () => {
        const { navigation } = this.props
        navigation.navigate('SettingsScreen')
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.openSettings}>
                    <View style={styles.iconContainer}>
                        <Ionicons name='ios-settings' size={30} color={colors.black.one} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        padding: 5,
        paddingRight: 20,
        paddingLeft: 20,
    },
})

export default withNavigation(HeaderRight)