import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

import colors from '../../../assets/colors'

class CancelButton extends Component {

    goBack = () => {
        const { navigation } = this.props
        navigation.goBack()
    }

    render() {
        return (
            <View style={styles.cancelOuterContainer}>
                <TouchableOpacity onPress={this.goBack}>
                    <View style={styles.cancelInnerContainer}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cancelOuterContainer: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '10%',
    },
    cancelInnerContainer: {
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 50,
        backgroundColor: colors.black.one + '80',
    },
    cancelText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.white.one
    }
})


export default withNavigation(CancelButton)