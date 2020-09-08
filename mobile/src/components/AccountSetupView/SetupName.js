import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import colors from '../../../assets/colors'
import { setAlertOptions, setShowAlert } from '../../store/actions/alert'

class SetupName extends Component {

    onSubmit = () => {
        const { scrollTo, full_name, setAlertOptions, setShowAlert } = this.props
        if (!full_name || full_name === '') {
            setAlertOptions({
                title: 'Error', 
                message: 'full_name needs to be filled!', 
                showCancelButton: false,
                showConfirmButton: true, 
                confirmText: 'OK',
            })
            setShowAlert(true)
        } else {
            scrollTo(1)
        }
    }

    render() {
        const { setFullName } = this.props
        return (
            <View style={styles.itemContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Choose display name</Text>
                </View>
                <View style={styles.inputOuterContainer}>
                    <View style={styles.inputInnerContainer}>
                        <TextInput style={styles.inputText}
                            placeholder='Display name'
                            autoFocus={true}
                            onChangeText={setFullName}
                            onSubmitEditing={this.onSubmit} />
                    </View>
                </View>
                <View style={styles.buttonOuterContainer}>
                    <TouchableOpacity onPress={this.onSubmit}>
                        <View style={styles.buttonInnerContainer}>
                            <Text style={styles.buttonText}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        width: Dimensions.get('window').width,
        paddingTop: 100,
        padding: 20,
    },
    titleContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    titleText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: colors.black.one
    },
    inputOuterContainer: {
        padding: 20,
        paddingTop: 30,
    },
    inputInnerContainer: {
        borderColor: colors.gray.one,
        borderBottomWidth: 1,
        padding: 10,
    },
    inputText: {
        fontSize: 16,
        color: colors.black.one
    },
    buttonOuterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    buttonInnerContainer: {
        borderColor: colors.pink.one,
        borderWidth: 1.5,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 60,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.pink.one
    }
})

const mapDispatchToProps = dispatch => {
    return {
        setShowAlert: (show) => dispatch(setShowAlert(show)),
        setAlertOptions: (data) => dispatch(setAlertOptions(data)),
    }
}

export default connect(null, mapDispatchToProps)(SetupName)