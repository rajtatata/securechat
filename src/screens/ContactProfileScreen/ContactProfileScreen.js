import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'

import colors from '../../../assets/predefinedColors/predefinedColors'
import ContactProfile from '../../components/ContactProfile/ContactProfile'
import ContactProfileHeader from '../../components/ContactProfile/ContactProfileHeader/ContactProfileHeader'

class ContactProfileScreen extends Component {

    static navigationOptions = ({ navigation }) => {

        const contactId = navigation.getParam('contactId', null)
        const contact = navigation.getParam('contact', null)

        return {
            headerTitle: (<ContactProfileHeader contactId={contactId} contact={contact} />),
            headerStyle: {
                backgroundColor: colors.white,
                elevation: 0,
                shadowColor: colors.white,
                borderBottomWidth: 0,
            },
            headerBackTitle: null,
            headerBackImage: null,
            headerBackTitleVisible: false,
            headerLeft: null,
        }
    }

    state = {
        contactProfileComponent: false
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                contactProfileComponent: true
            })
        }, 10)
    }

    render() {
        if (!this.state.contactProfileComponent) {
            return <ActivityIndicator size="large" color={colors.black} />
        }

        const contactId = this.props.navigation.getParam('contactId', null)
        const contact = this.props.navigation.getParam('contact', null)

        return (
            <ContactProfile contactId={contactId} contact={contact} />
        )
    }
}

export default ContactProfileScreen