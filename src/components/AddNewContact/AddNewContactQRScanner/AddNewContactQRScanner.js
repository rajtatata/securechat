import React, { Component } from 'react'
import { View, StyleSheet, Text, Alert, Dimensions, ActivityIndicator } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { askAsync, CAMERA } from 'expo-permissions'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import { parseQRData } from '../../../util/QRCode'
import { insertContact } from '../../../util/database'
import { parseNewContact } from '../../../util/contact'
import { addNewContact } from '../../../store/actions/contacts'

class AddNewContactQRScanner extends Component {

    state = {
        hasCameraPermission: null,
        scannedData: false,
        windowWidth: Dimensions.get('window').width,
        windowHeight: Dimensions.get('window').height,
        showActivity: false,
        activityText: "adding new contact",
        activityStatus: <ActivityIndicator size="large" color={colors.black} />
    }

    componentDidMount = () => {
        this.requestCameraPermission()
    }

    requestCameraPermission = async () => {
        const { status } = await askAsync(CAMERA)
        this.setState({
            hasCameraPermission: status === 'granted',
        })
    }

    addContact = (parsedData) => {
        this.setState({
            showActivity: true,
            activityText: "adding new contact",
            activityStatus: <ActivityIndicator size="large" color={colors.black} />
        }, () => {
            insertContact(this.props.dbConn, parsedData).then(() => {
                this.props.addNewContact(parseNewContact(parsedData))
                this.setState({
                    scannedData: false,
                    activityText: "contact added",
                    activityStatus: <Ionicons name="md-checkmark" color={colors.black} size={30} />
                })
            })
                .catch(err => {
                    if (err.toString().includes("code 1555")) {
                        this.setState({
                            scannedData: false,
                            activityText: "contact already added",
                            activityStatus: <Ionicons name="md-alert" color={colors.black} size={30} />
                        })
                    } else {
                        this.setState({
                            scannedData: false,
                            activityText: "error saving contact",
                            activityStatus: <Ionicons name="md-alert" color={colors.black} size={30} />
                        })
                    }
                })
        })
    }

    onBarCodeScannedHandler = ({ data }) => {
        this.setState({
            scannedData: true
        }, () => {
            const parsedData = parseQRData(data)
            if (parsedData) {
                Alert.alert(
                    "New Contact",
                    "Contact scanned: " + parsedData.fullName + " (" + parsedData.id + ")",
                    [
                        { text: 'Cancel', onPress: () => this.setState({ scannedData: false }) },
                        {
                            text: 'Add', onPress: () => this.addContact(parsedData)
                        },
                    ], {
                        cancelable: false
                    }
                )
            } else {
                this.setState({
                    scannedData: false
                })
            }
        })
    }

    render() {
        let barcodeScanner = (
            <View style={styles.container}>
                <View style={[styles.rectangleContainer, { width: this.state.windowWidth, height: this.state.windowHeight }]}>
                    <View style={styles.rectangleMiddle}></View>
                    <View style={[styles.activityContainer, { display: this.state.showActivity ? "flex" : "none" }]}>
                        {this.state.activityStatus}
                        <Text style={styles.activityText}>{this.state.activityText}</Text>
                    </View>
                </View>
                <BarCodeScanner
                    onBarCodeScanned={!this.state.scannedData ? this.onBarCodeScannedHandler : null}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        )

        if (this.state.hasCameraPermission === null) {
            barcodeScanner = (<Text>Requesting Camera Permission</Text>)
        }

        if (this.state.hasCameraPermission === false) {
            barcodeScanner = (<Text>Camera Permission not Granted</Text>)
        }

        return barcodeScanner
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rectangleContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,

    },
    rectangleMiddle: {
        width: 350,
        height: 400,
        borderWidth: 10,
        borderRadius: 50,
        borderColor: colors.white,
        borderStyle: "dashed",
    },
    activityContainer: {
        flexDirection: "row",
        marginTop: 20,
        backgroundColor: colors.white + "80",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    activityText: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.black,
        marginLeft: 10
    }
})

const mapStateToProps = state => {
    return {
        dbConn: state.database.conn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewContact: (c) => dispatch(addNewContact(c))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewContactQRScanner)