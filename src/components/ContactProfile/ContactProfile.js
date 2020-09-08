import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import nacl from 'tweet-nacl-react-native-expo'

import ContactProfileImage from './ContactProfileImage/ContactProfileImage'
import ContactProfileQRCode from './ContactProfileQRCode/ContactProfileQRCode'
import ProfileInfoField from './ProfileInfoField/ProfileInfoField'
import { setItemPressed } from '../SingleChat/SingleChatHeader/SingleChatHeader'

class ContactProfile extends Component {

    componentWillUnmount = () => {
        setItemPressed(false)
    }

    render() {
        const { contactId, contact } = this.props
        return (
            <ScrollView style={styles.container}>
                <ContactProfileImage image={contact.avatar} />
                <ProfileInfoField title="USER ID" info={contactId} />
                <ProfileInfoField title="FULL NAME" info={contact.fullName} />
                <ProfileInfoField title="EMAIL" info={contact.email} />
                <ContactProfileQRCode qrCodeData={JSON.stringify({
                    id: contactId,
                    full_name: contact.fullName,
                    public_key: nacl.util.encodeBase64(contact.publicKey),
                    avatar: contact.avatar,
                    email: contact.email
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

export default ContactProfile