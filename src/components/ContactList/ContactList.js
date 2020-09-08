import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'

import ContactListItem from './ContactListItem/ContactListItem'
import ContactListSearchBar from './ContactListSearchBar/ContactListSearchBar'
import ContactListResultInfo from './ContactListResultInfo/ContactListResultInfo'
import colors from '../../../assets/predefinedColors/predefinedColors'

class ContactList extends Component {
    state = {
        resultCounter: Object.keys(this.props.contacts).length,
        resultCounterTotal: Object.keys(this.props.contacts).length,
        searchString: null,
    }

    componentDidUpdate = () => {
        // check if new contact is added, and fix result counter
        const contactLength = Object.keys(this.props.contacts).length

        if (contactLength !== this.state.resultCounterTotal) {
            this.setState({
                resultCounterTotal: contactLength,
                resultCounter: contactLength
            })
        }
    }

    onSearch = (text) => {
        this.setState({
            searchString: text,
            resultCounter: this.state.resultCounterTotal
        })
    }

    onListItemHidden = () => {
        // fix result counter
        this.setState(prevState => {
            return {
                resultCounter: prevState.resultCounter - 1
            }
        })
    }

    render() {
        const { contacts } = this.props

        let contactList = (
            <FlatList
                data={Object.keys(contacts).sort((a, b) => {
                    return contacts[a].fullName > contacts[b].fullName
                })}
                renderItem={data => (
                    <ContactListItem contactId={data.item} contact={this.props.contacts[data.item]} searchString={this.state.searchString} onListItemHidden={this.onListItemHidden} />
                )}
                keyExtractor={item => item} />
        )
        if (Object.keys(this.props.contacts).length === 0) {
            contactList = (
                <View style={styles.emptyContainer}>
                    <TouchableOpacity>
                        <View style={styles.emptyTextContainer}>
                            <Text style={styles.emptyText}>Empty List</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View>
                <ContactListSearchBar onSearch={this.onSearch} />
                <ContactListResultInfo resultCounter={this.state.resultCounter} />
                {contactList}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        flexDirection: "column",
        padding: 20,
        flex: 1,
    },
    emptyTextContainer: {
        width: "100%",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lighterGray
    },
    emptyText: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.black,
    }
})

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.list
    }
}

export default connect(mapStateToProps, null)(ContactList)