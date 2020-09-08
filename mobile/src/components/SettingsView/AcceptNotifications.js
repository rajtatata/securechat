import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { connect } from 'react-redux'
import Constants from 'expo-constants'

import colors from '../../../assets/colors'
import { upsertSettings } from '../../store/actions/settings'
import { setAlertOptions, setShowAlert } from '../../store/actions/alert'
import { updateNotifications } from '../../services/network/user'

class AcceptNotifications extends Component {

    showInfo = () => {
        const { setAlertOptions, setShowAlert } = this.props
        setAlertOptions({
            title: 'Accept Notifications',
            message: 'If you decide to disable this you won\'t get notifications when app is closed',
            showConfirmButton: true,
            confirmText: 'OK',
        })
        setShowAlert(true)
    }

    onToggle = value => {
        const { upsertSettings, admin } = this.props
        upsertSettings({
            key: 'acceptNotifications',
            value
        })
        updateNotifications({
            userId: admin.id,
            installationId: Constants.installationId,
            acceptNotifications: value
        })
    }

    render() {
        const { acceptNotifications } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.itemText}>Accept Notifications</Text>
                    <TouchableOpacity onPress={this.showInfo}>
                        <View style={styles.infoOuterContainer}>
                            <View style={styles.infoInnerContainer}>
                                <Text style={styles.infoText}>i</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Switch
                    value={acceptNotifications === 1}
                    onValueChange={this.onToggle} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemText: {
        fontSize: 18,
        color: colors.black.one
    },
    infoOuterContainer: {
        paddingLeft: 10,
        paddingRight: 10
    },
    infoInnerContainer: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.gray.one,
        borderWidth: 0.5,
        borderRadius: 10,
    },
    infoText: {
        fontSize: 16,
        color: colors.black.two
    }
})

const mapStateToProps = state => {
    return {
        acceptNotifications: state.settings.acceptNotifications,
        admin: state.admin.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        upsertSettings: data => dispatch(upsertSettings(data)),
        setShowAlert: (show) => dispatch(setShowAlert(show)),
        setAlertOptions: (data) => dispatch(setAlertOptions(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptNotifications)