import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import colors from '../../../assets/colors'

class GradientBackground extends Component {


    render() {
        return (
            <React.Fragment>
                <LinearGradient
                    colors={this.props.colors || [colors.gray.two, colors.pink.four]}
                    style={styles.gradientContainer}
                    start={this.props.start}
                    end={this.props.end}>
                </LinearGradient>
                < View
                    style={this.props.style || styles.container}
                    onLayout={this.props.onLayout} >
                    {this.props.children}
                </View >
            </React.Fragment>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientContainer: {
        top: 0,
        position: 'absolute',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
})

export default GradientBackground