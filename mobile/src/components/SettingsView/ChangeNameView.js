import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

import colors from '../../../assets/colors'
import GradientBackground from '../GradientBackground/GradientBackground'
import { setAdmin } from '../../store/actions/admin'
import { setShowAlert, setAlertOptions } from '../../store/actions/alert'
import { updateAdmin as updateAdminDb } from '../../services/database/admin'

class ChangeNameView extends Component {
    state = {
        value: ''
    }

    onSave = () => {
        const { dbConn, setAdmin, admin, navigation, setAlertOptions, setShowAlert } = this.props
        const { value } = this.state
        if (value !== '') {
            updateAdminDb(dbConn, { full_name: value })
            setAdmin({ ...admin, full_name: value })
            navigation.goBack()
        } else {
            setAlertOptions({
                title: 'Error',
                message: 'Please fill name!',
                showConfirmButton: true,
                confirmText: 'OK',
            })
            setShowAlert(true)
        }
    }

    render() {
        const { admin } = this.props
        return (
            <GradientBackground>
                <View style={styles.itemContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Change Name</Text>
                    </View>
                    <View style={styles.inputOuterContainer}>
                        <View style={styles.inputInnerContainer}>
                            <TextInput style={styles.inputText}
                                placeholder={admin.full_name}
                                autoFocus={true}
                                value={this.state.value}
                                onChangeText={value => this.setState({ value })}
                                onSubmitEditing={this.onSave} />
                        </View>
                    </View>
                    <View style={styles.buttonOuterContainer}>
                        <TouchableOpacity onPress={this.onSave}>
                            <View style={styles.buttonInnerContainer}>
                                <Text style={styles.buttonText}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </GradientBackground>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        paddingTop: 50,
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
        paddingTop: 10,
    },
    buttonInnerContainer: {
        borderColor: colors.pink.one,
        borderWidth: 1.5,
        padding: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        width: '90%'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.pink.one
    },
})

const mapStateToProps = state => {
    return {
        admin: state.admin.data,
        dbConn: state.database.conn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAdmin: (admin) => dispatch(setAdmin(admin)),
        setShowAlert: (show) => dispatch(setShowAlert(show)),
        setAlertOptions: (data) => dispatch(setAlertOptions(data)),
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ChangeNameView))