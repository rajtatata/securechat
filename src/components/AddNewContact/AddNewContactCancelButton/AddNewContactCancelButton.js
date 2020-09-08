import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { withNavigation } from 'react-navigation'

import colors from '../../../../assets/predefinedColors/predefinedColors'

class AddNewContactCancelButton extends Component {

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.goBack}>
                    <View>
                        <Text style={styles.text}>Cancel</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.white
    }

})

export default withNavigation(AddNewContactCancelButton)