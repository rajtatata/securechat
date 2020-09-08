import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { LinearGradient } from 'expo-linear-gradient'
import { withNavigation } from 'react-navigation'

import colors from '../../../assets/colors'
import GradientBackground from '../GradientBackground/GradientBackground'
import { createQRData } from '../../utils/qrCode'

class ProfileView extends Component {

    openChangePicture = () => {
        const { navigation, isAdmin } = this.props
        if (isAdmin) {
            navigation.navigate('ChangePictureScreen')
        }
    }

    render() {
        const { user } = this.props

        if (!user) {
            return (
                <GradientBackground>
                    <ActivityIndicator size='large' color={colors.black.one} />
                </GradientBackground>
            )
        }
        const { avatar, full_name, id, public_key } = user

        return (
            <GradientBackground>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>

                    <View style={styles.imageOuterContainer}>
                        <TouchableOpacity onPress={this.openChangePicture}>
                            <LinearGradient
                                colors={[colors.pink.four, colors.pink.two, colors.pink.one]}
                                style={styles.imageContainer}
                                start={[0, 1]}
                                end={[1, 0]}>
                                <Image source={{ uri: avatar }}
                                    style={styles.image}
                                    resizeMode='cover' />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>{full_name}</Text>
                    </View>

                    <View style={styles.qrContainer}>
                        <TouchableOpacity>
                            <View style={{ padding: 20, backgroundColor: colors.white.one }}>
                                <QRCode
                                    value={createQRData({
                                        id, full_name, public_key, avatar
                                    })}
                                    color={colors.pink.one}
                                    size={300} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.idContainer}>
                            <Text style={styles.idText}>#{id}</Text>
                        </View>
                    </View>

                </ScrollView>
            </GradientBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    scrollView: {
        flex: 1
    },
    imageOuterContainer: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        borderRadius: 50,
        overflow: 'hidden',
        width: 100,
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80
    },
    nameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    nameText: {
        color: colors.pink.one,
        fontSize: 25,
        fontWeight: 'bold'
    },
    qrContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    idContainer: {
        paddingTop: 10,
    },
    idText: {
        color: colors.black.one,
        fontWeight: '500'
    }
})

export default withNavigation(ProfileView)