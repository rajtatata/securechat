import React, { Component } from 'react'
import { View, Text, RefreshControl } from 'react-native'
import { connect } from 'react-redux'

import AlphabetSlider from '../AlphabetSlider/AlphabetSlider'
import SingleContactItem from './SingleContactItem'
import GradientBackground from '../GradientBackground/GradientBackground'
import SearchInput from './SearchInput'
import { getContacts } from '../../store/actions/contact'
import colors from '../../../assets/colors'
import { REFRESH_CONTACTS } from '../../utils/constants'

class ContactsListView extends Component {

    state = {
        filter: ''
    }

    onFilterChange = value => {
        this.setState({ filter: value })
    }

    componentDidMount = () => {
        const { contacts, getContacts } = this.props
        if (!contacts) {
            getContacts()
        }
    }

    onRefresh = () => {
        const { getContacts } = this.props
        getContacts()
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        const { filter } = this.state
        const { contacts, refreshing } = this.props

        if (filter !== nextState.filter) return true
        if (contacts.length !== nextProps.contacts.length) return true
        if (refreshing !== nextProps.refreshing) return true

        return false
    }

    render() {
        const { filter } = this.state
        const { contacts, refreshing } = this.props

        if (!contacts || contacts.length === 0) {
            return (
                <GradientBackground>
                    <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: colors.black.one }}>No contacts</Text>
                    </View>
                </GradientBackground>
            )
        }

        // data = [{letter: '', sortName: '', view: <JSX>}]
        return (
            <GradientBackground>
                <SearchInput filter={filter} onFilterChange={this.onFilterChange} />
                <View style={{ flex: 1 }}>
                    <AlphabetSlider
                        data={contacts.filter(elem => elem.full_name.toLowerCase().includes(filter.toLowerCase())).map(elem => {
                            const { full_name, avatar, id } = elem
                            return {
                                letter: full_name.substring(0, 1).toUpperCase(),
                                sortName: full_name.toUpperCase(),
                                view: (<SingleContactItem name={full_name} image={avatar} id={id} />)
                            }
                        })}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} tintColor={colors.black.one} />} />
                </View>
            </GradientBackground>
        )
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contacts.list,
        refreshing: state.loaders.refreshing[REFRESH_CONTACTS]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getContacts: () => dispatch(getContacts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListView)