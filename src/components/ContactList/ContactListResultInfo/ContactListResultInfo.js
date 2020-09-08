import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import colors from '../../../../assets/predefinedColors/predefinedColors'

class ContactListResultInfo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Results: {this.props.resultCounter}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 5,
    },
    text: {
        color: colors.gray
    }
})

export default ContactListResultInfo