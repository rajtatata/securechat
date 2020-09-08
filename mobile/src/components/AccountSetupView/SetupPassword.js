import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import colors from '../../../assets/colors'
import { setAlertOptions, setShowAlert } from '../../store/actions/alert'

class SetupPassword extends Component {

    state = {
        focusedOnce: false
    }

    componentDidUpdate = () => {
        setTimeout(() => {
            const { focusedOnce } = this.state
            const { focusedElement } = this.props
            if (focusedElement === 'password' && !focusedOnce) {
                this.setState({ focusedOnce: true })
                this.passInput.focus()
            }
        }, 500)
    }

    onSubmit = () => {
        const { scrollTo, password, confirmPassword, setAlertOptions, setShowAlert } = this.props
        if (!password || !confirmPassword || password !== confirmPassword) {
            setAlertOptions({
                title: 'Error', 
                message: 'Passwords need to be filled and the same!', 
                showCancelButton: false,
                showConfirmButton: true, 
                confirmText: 'OK',
            })
            setShowAlert(true)
        } else {
            scrollTo(2)
        }
    }

    render() {
        const { setPassword, setConfirmPassword } = this.props
        return (
            <View style={styles.itemContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Setup a password</Text>
                </View>
                <View style={styles.inputOuterContainer}>
                    <View style={styles.inputInnerContainer}>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.inputText}
                            placeholder='Password'
                            ref={ref => this.passInput = ref}
                            onChangeText={setPassword}
                            onSubmitEditing={() => this.confirmPassInput.focus()} />
                    </View>
                </View>
                <View style={styles.inputOuterContainer}>
                    <View style={styles.inputInnerContainer}>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.inputText}
                            placeholder='Confirm Password'
                            ref={ref => this.confirmPassInput = ref}
                            onChangeText={setConfirmPassword}
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

export default connect(null, mapDispatchToProps)(SetupPassword)