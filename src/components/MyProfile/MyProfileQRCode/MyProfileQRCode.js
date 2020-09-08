import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import colors from '../../../../assets/predefinedColors/predefinedColors'

class MyProfileQRCode extends Component {
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText} >QR CODE</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <TouchableOpacity>
                            <View>
                                <QRCode value={this.props.qrCodeData} color={colors.black} size={300} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.lightGray,
        margin: 20,
        borderRadius: 20,
    },
    titleContainer: {
        position: "absolute",
        marginTop: -11,
        marginLeft: 20,
        backgroundColor: colors.white,
        paddingLeft: 5,
        paddingRight: 5,
    },
    infoContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    titleText: {
        fontWeight: "bold",
        color: colors.gray
    }
})

export default MyProfileQRCode