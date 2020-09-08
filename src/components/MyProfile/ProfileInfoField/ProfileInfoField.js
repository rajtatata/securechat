import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import colors from '../../../../assets/predefinedColors/predefinedColors'

class ProfileInfoField extends Component {

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText} >{this.props.title}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText} >{this.props.info}</Text>
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
        margin: 10,
        marginLeft: 25
    },
    titleText: {
        fontWeight: "bold",
        color: colors.gray,
        fontSize: 12,
    },
    infoText: {
        color: colors.black,
        fontWeight: "bold",
        fontSize: 14,
    }
})

export default ProfileInfoField