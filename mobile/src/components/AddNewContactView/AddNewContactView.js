import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import colors from '../../../assets/colors'
import GradientBackground from '../GradientBackground/GradientBackground'
import QRCodeScanner from './QRCodeScanner'
import Guideline from './Guideline'
import CancelButton from './CancelButton'
import Rectangle from './Rectangle'

class AddNewContactView extends Component {

    state = {
        hasCameraPermission: null,
    }

    componentDidMount = () => {
        this.requestCameraPermission()
    }

    requestCameraPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        this.setState({
            hasCameraPermission: status === 'granted',
        })
    }

    render() {
        const { hasCameraPermission } = this.state

        if (!hasCameraPermission) {
            return (
                <GradientBackground style={styles.initialContainer}>
                    {hasCameraPermission === null ?
                        <Text style={styles.initialText}>Requesting Camera Permission</Text> :
                        <Text style={styles.initialText}>Camera Permission Not Granted</Text>}
                </GradientBackground>
            )
        }

        return (
            <View style={styles.container}>
                <QRCodeScanner />
                <Guideline />
                <Rectangle />
                <CancelButton />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    initialContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    initialText: {
        fontSize: 20,
        color: colors.black.one
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})


export default AddNewContactView