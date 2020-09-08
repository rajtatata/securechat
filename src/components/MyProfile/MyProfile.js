import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import nacl from 'tweet-nacl-react-native-expo'

import MyProfileImage from './MyProfileImage/MyProfileImage'
import MyProfileQRCode from './MyProfileQRCode/MyProfileQRCode'
import ProfileInfoField from './ProfileInfoField/ProfileInfoField'

class MyProfile extends Component {

    render() {
        const { admin } = this.props
        return (
            <ScrollView style={styles.container}>
                <MyProfileImage image={admin.avatar} />
                <ProfileInfoField title="USER ID" info={admin.id} />
                <ProfileInfoField title="FULL NAME" info={admin.fullName} />
                <ProfileInfoField title="EMAIL" info={admin.email} />
                <MyProfileQRCode qrCodeData={JSON.stringify({
                    id: admin.id,
                    full_name: admin.fullName,
                    public_key: nacl.util.encodeBase64(admin.publicKey),
                    avatar: admin.avatar,
                    email: admin.email
                })} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const mapStateToProps = state => {
    return {
        admin: state.admin.admin
    }
}

export default connect(mapStateToProps, null)(MyProfile)