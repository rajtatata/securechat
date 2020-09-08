import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import colors from '../../../../assets/predefinedColors/predefinedColors'

class SecurityView extends Component {

    onNextButtonClick = () => {
        this.props.onNextButtonClick()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Ionicons name="md-lock" size={150} color={colors.white} />
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.textHeadingContainer}>
                        <Text style={styles.textHeading}>Secure</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Messages will be encrypted before sending out to server and they will remain encrypted on your phone</Text>
                    </View>
                    <View style={styles.buttonOuterContainer}>
                        <TouchableOpacity onPress={this.onNextButtonClick}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.button}>Next</Text>
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
        alignItems: "center",
        width: Dimensions.get('window').width,
        backgroundColor: colors.darkBlack,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: "30%",
        width: "50%",
        marginTop: "40%"
    },
    image: {
        height: "100%",
        width: "100%",
    },
    infoContainer: {
        position: "absolute",
        bottom: 0,
        marginBottom: "30%"
    },
    textHeadingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    textHeading: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.white
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingTop: 5,
    },
    text: {
        fontSize: 15,
        color: colors.gray,
        textAlign: "center",
    },
    buttonOuterContainer: {
        marginTop: 30,
        marginRight: 30,
        alignItems: "flex-end",
    },
    buttonContainer: {
        borderWidth: 2,
        borderColor: colors.lightGray,
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.white,

    },
    button: {
        fontSize: 15,
        color: colors.black,
        textAlign: "center",
    }
})

export default SecurityView