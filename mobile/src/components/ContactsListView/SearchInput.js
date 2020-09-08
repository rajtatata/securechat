import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import colors from '../../../assets/colors'

class SearchInput extends Component {

    shouldComponentUpdate = (nextProps, nextState) => {
        const { filter } = this.props
        if (filter !== nextProps.filter) return true
        return false
    }

    render() {
        const { filter, onFilterChange } = this.props
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => this.filterInput.focus()}>
                    <View style={styles.innerContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons name='ios-search' size={22} color={colors.black.two} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={ref => this.filterInput = ref}
                                placeholder='Search'
                                style={styles.inputText}
                                onChangeText={onFilterChange}
                                value={filter} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    innerContainer: {
        backgroundColor: colors.white.one,
        borderRadius: 10,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5
    },
    iconContainer: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    inputText: {
        color: colors.black.two,
        fontSize: 16
    }

})

export default SearchInput