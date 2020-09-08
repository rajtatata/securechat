import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import { changeAdminName } from '../../../store/actions/admin'
import { updateAdminFullName } from '../../../util/database'

class ChangeName extends Component {

    state = {
        loading: false,
        name: "",
        viewMarginBottom: 0
    }

    _keyboardDidShow = (e) => {
        const keyboardHeight = e.endCoordinates.height

        this.setState({
            viewMarginBottom: keyboardHeight
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            viewMarginBottom: 0
        })
    }

    componentDidMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
    }

    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    onNameChange = (text) => {
        this.setState({
            name: text
        })
    }

    settingsView = () => {
        this.props.changeView("settings")
    }

    onSubmit = () => {
        const { name } = this.state
        const { dbConn, changeAdminName, changeView } = this.props

        if (name === "") {
            alert("Name cannot be empty!")
            this.setState({
                name: ""
            }, () => {
                this.nameInput.focus()
            })
        } else {
            this.setState({
                loading: true
            }, () => {
                updateAdminFullName(dbConn, name)
                    .then(() => {
                        changeAdminName(name)
                        changeView("settings")
                    }).catch(err => {
                        // console.log(err)
                    })
            })

        }
    }

    render() {

        let submitButton = (
            <TouchableOpacity onPress={this.onSubmit}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Submit</Text>
                </View>
            </TouchableOpacity>
        )
        if (this.state.loading) {
            submitButton = (
                <View style={styles.buttonContainer}>
                    <ActivityIndicator size="small" color={colors.white} />
                </View>
            )
        }

        return (
            <View style={[styles.container, { marginBottom: this.state.viewMarginBottom }]}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTextHeading}>Change display Name</Text>
                    <Text style={styles.infoText}>New contacts that add you from now on will have the new display name, the old contacts will have your old name.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputItemContainer}>
                        <TextInput
                            style={styles.inputItem}
                            placeholder="Name"
                            value={this.state.name}
                            underlineColorAndroid="transparent"
                            onChangeText={this.onNameChange}
                            blurOnSubmit={false}
                            onSubmitEditing={this.onSubmit}
                            ref={elem => this.nameInput = elem} />
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={this.settingsView}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                    {submitButton}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    infoContainer: {
        alignItems: "center",
        padding: 20,
    },
    infoTextHeading: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.black,
        textAlign: "center"
    },
    infoText: {
        fontSize: 12,
        color: colors.darkBlack,
        textAlign: "center"
    },
    inputContainer: {
        width: "100%",
        padding: 20,
    },
    inputItemContainer: {
        padding: 10,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 2,
    },
    inputItem: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.black,
    },
    buttonsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: colors.blue,
    },
    buttonText: {
        fontSize: 12,
        color: colors.white,
        textAlign: "center",
        fontWeight: "bold"
    }
})

const mapStateToProps = state => {
    return {
        dbConn: state.database.conn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeAdminName: (name) => dispatch(changeAdminName(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeName)