import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'

import logoWhite from '../../../../assets/logo-white.png'
import colors from '../../../../assets/predefinedColors/predefinedColors'

class SecurityView extends Component {

    onNextButtonClick = () => {
        this.props.onNextButtonClick()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textHeadingContainer}>
                    <Text style={styles.textHeading}>Welcome to SecureChat!</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={logoWhite} style={styles.image} resizeMode="contain" />
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Send messages to friends without worrying about security</Text>
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
        height: 150,
        width: "100%",
        marginTop: 20,
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
        marginTop: "40%",
        justifyContent: "center",
        alignItems: "center",
    },
    textHeading: {
        fontSize: 20,
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