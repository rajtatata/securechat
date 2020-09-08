import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

import { insertContact } from '../../store/actions/contact'
import { setAlertOptions, setShowAlert } from '../../store/actions/alert'
import { parseQRData } from '../../utils/qrCode'

class QRCodeScanner extends Component {

    state = {
        scanned: false
    }

    handleBarCodeScanned = ({ type, data }) => {
        const { scanned } = this.state
        const { insertContact, setAlertOptions, setShowAlert, navigation } = this.props

        if (!scanned) {
            this.setState({ scanned: true })
            const contact = parseQRData(data)
            if (contact) {
                setAlertOptions({
                    title: 'Add Contact',
                    message: `Add ${contact.full_name}?`,
                    showCancelButton: true,
                    showConfirmButton: true,
                    onConfirmPressed: () => {
                        insertContact(contact)
                        this.setState({ scanned: false })
                        setShowAlert(false)
                        navigation.goBack()
                    },
                    onCancelPressed: () => {
                        this.setState({ scanned: false })
                        setShowAlert(false)
                    },
                    confirmText: 'OK',
                    cancelText: 'Cancel',
                })
                setShowAlert(true)
            } else {
                this.setState({ scanned: true })
            }
        }
    }

    render() {
        return (
            <BarCodeScanner
                onBarCodeScanned={this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setShowAlert: (show) => dispatch(setShowAlert(show)),
        setAlertOptions: (data) => dispatch(setAlertOptions(data)),
        insertContact: (data) => dispatch(insertContact(data))
    }
}

export default connect(null, mapDispatchToProps)(withNavigation(QRCodeScanner))