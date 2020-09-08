import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'

import colors from '../../../assets/predefinedColors/predefinedColors'
import SingleChat from '../../components/SingleChat/SingleChat'
import SingleChatHeader from '../../components/SingleChat/SingleChatHeader/SingleChatHeader'

class SingleChatScreen extends Component {

    static navigationOptions = ({ navigation }) => {

        const contactId = navigation.getParam('contactId', null)
        const contact = navigation.getParam('contact', null)

        return {
            headerTitle: (<SingleChatHeader contactId={contactId} contact={contact} />),
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
        singleChatComponent: false
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                singleChatComponent: true
            })
        }, 10)
    }

    render() {
        if (!this.state.singleChatComponent) {
            return <ActivityIndicator size="large" color={colors.black} />
        }
        return (
            <SingleChat contactId={this.props.navigation.getParam('contactId', null)}
                contact={this.props.navigation.getParam('contact', null)} />
        )
    }
}

export default SingleChatScreen