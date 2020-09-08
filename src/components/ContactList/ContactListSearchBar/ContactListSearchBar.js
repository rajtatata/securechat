import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import colors from '../../../../assets/predefinedColors/predefinedColors'

class ContactListSearchBar extends Component {

    onSearch = (text) => {
        this.props.onSearch(text)
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="md-search" size={20} style={styles.icon} color={colors.gray} />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput placeholder="Search by name" style={styles.textInput} onChangeText={this.onSearch} />
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: colors.lighterGray,
        borderRadius: 20,
        borderColor: colors.lightGray,
    },
    textInputContainer: {
        justifyContent: "center",
        flex: 1
    },
    iconContainer: {
        justifyContent: "center",
        marginRight: 10,
        marginLeft: 5,
    },
    textInput: {

    },
    icon: {

    }
})

export default ContactListSearchBar