import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import colors from '../../../assets/colors'

class Rectangle extends Component {
    render() {
        return (
            <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rectangleContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rectangle: {
        width: '70%',
        height: '40%',
        borderColor: colors.white.one,
        borderWidth: 7,
        borderRadius: 20,
        borderStyle: 'dashed'
    }
})


export default Rectangle