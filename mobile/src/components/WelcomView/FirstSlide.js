import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const chatImage = require('../../../assets/images/chatting.png')
import colors from '../../../assets/colors'

class FirstSlide extends Component {
    render() {
        return (
            <LinearGradient style={styles.itemContainer} colors={['#90A7D3', colors.pink.two]}>
                <View style={styles.imageContainer}>
                    <View style={styles.imageInnerContainer}>
                        <Image source={chatImage} resizeMode='contain' style={styles.imageInnerContainer} />
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Welcome to SecureChat</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>Send messages to friends and family without worrying about security.
                        The app will not keep messages on the server.</Text>
                    </View>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        width: Dimensions.get('window').width,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    imageInnerContainer: {
        width: 300,
        height: 300,
    },
    infoContainer: {
        paddingBottom: 150,
        padding: 20,
        paddingRight: 50,
    },
    titleContainer: {

    },
    descriptionContainer: {
        paddingTop: 20,
    },
    titleText: {
        color: colors.black.one,
        fontSize: 40,
        fontWeight: 'bold'
    },
    descriptionText: {
        color: colors.black.one,
        fontSize: 18,
    }
})

export default FirstSlide