import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import colors from '../../../../assets/predefinedColors/predefinedColors'

class AddNewContactGuideline extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text  style={styles.textGuideline}>
                    Navigate to
                    <Text  style={{ fontWeight: "bold" }}> Profile tab </Text>
                    on your friend's mobile and scan his
                    <Text  style={{ fontWeight: "bold" }}> QR code </Text>
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white + "80",
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
    },
    textGuideline: {
        textAlign: "center",
        color: colors.black,
        fontSize: 16,
    }
})

export default AddNewContactGuideline