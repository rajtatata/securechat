import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

import ContactList from '../../components/ContactList/ContactList'
import ContactListHeader from '../../components/ContactList/ContactListHeader/ContactListHeader'
import colors from '../../../assets/predefinedColors/predefinedColors'

class ContactListScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <ContactListHeader />,
            headerStyle: {
                backgroundColor: colors.white,
                elevation: 0,
                shadowColor: colors.white,
                borderBottomWidth: 0,
            }
        }
    }

    state = {
        contactListComponent: false
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                contactListComponent: true
            })
        }, 10)
    }
    render() {
        let contactlist = <ActivityIndicator size="large" color={colors.black} />
        if (this.state.contactListComponent) {
            contactlist = <ContactList />
        }
        return (
            <View style={styles.container}>
                {contactlist}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
})

export default ContactListScreen