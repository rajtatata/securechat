import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, Dimensions } from 'react-native'

import colors from '../../assets/colors'
import SingleChatView from '../components/SingleChatView/SingleChatView'
import GradientBackground from '../components/GradientBackground/GradientBackground'
import HeaderRight from '../components/SingleChatView/HeaderRight'
import { getContacts } from '../store/actions/contact'

class SingleChatScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', null),
            headerRight: <HeaderRight contact_id={navigation.getParam('id', null)} avatar={navigation.getParam('avatar', null)} />,
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

    componentDidMount = () => {
        const { contacts, getContacts, navigation } = this.props
        if (!contacts) {
            getContacts()
        } else {
            const contact_id = navigation.getParam('id', null)
            const contact = contacts.find(el => el.id === contact_id)
            navigation.setParams({
                id: contact_id,
                title: contact.full_name,
                avatar: contact.avatar
            })
        }
    }

    componentDidUpdate = () => {
        const { contacts, navigation } = this.props
        const contact_id = navigation.getParam('id', null)
        const avatar = navigation.getParam('avatar', null)
        if (contacts && !avatar) {
            const contact = contacts.find(el => el.id === contact_id)
            navigation.setParams({
                id: contact_id,
                title: contact.full_name,
                avatar: contact.avatar
            })
        }
    }

    render() {
        const { navigation } = this.props
        if (!navigation.getParam('title', null)) {
            return (
                <GradientBackground style={{
                    justifyContent: 'center', alignItems: 'center', flex: 1,
                }}>
                    <ActivityIndicator size='large' color={colors.black.one} />
                </GradientBackground>)
        }

        return (
            <SingleChatView contact_id={navigation.getParam('id', null)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleChatScreen)