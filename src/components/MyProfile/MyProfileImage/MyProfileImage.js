import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'

class MyProfileImage extends Component {
    render() {
        return (
            <View style={styles.profileImageContainer}>
                <TouchableOpacity>
                    <View>
                        <Image style={styles.profileImage} source={{ uri: this.props.image }} defaultSource={require('../../../../assets/defaultUserImage.png')} />
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    profileImageContainer: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 30,

    },
    profileImage: {
        width: 100,
        height: 100,
    }
})

export default MyProfileImage