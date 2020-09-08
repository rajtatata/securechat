import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProfileView from '../components/ProfileView/ProfileView'
import colors from '../../assets/colors'
import { getContacts } from '../store/actions/contact'

class ContactProfileScreen extends Component {

    state = {
        user: null
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Contact Profile',
            headerStyle: {
                backgroundColor: colors.gray.two,
                elevation: 0,
                borderBottomWidth: 0
            },
            headerTintColor: colors.black.one,
            headerTitleStyle: {
                fontSize: 20,
                color: colors.black.one
            },

        }
    }

    componentDidUpdate = () => {
        const { navigation, contacts } = this.props
        const id = navigation.getParam('id', null)
        if (contacts && !this.state.user) {
            const user = this.props.contacts.find(el => el.id === id)
            this.setState({ user })
        }
    }

    componentDidMount = () => {
        const { navigation, contacts, getContacts } = this.props
        const id = navigation.getParam('id', null)
        if (!contacts) {
            getContacts()
        } else {
            const user = this.props.contacts.find(el => el.id === id)
            this.setState({ user })
        }
    }

    render() {
        return (
            <ProfileView user={this.state.user} />
        )
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contacts.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getContacts: () => dispatch(getContacts())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactProfileScreen)