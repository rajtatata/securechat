import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { connect } from 'react-redux'

import colors from '../../../assets/colors'
import { upsertSettings } from '../../store/actions/settings'
import { setAlertOptions, setShowAlert } from '../../store/actions/alert'

class BackgroundLock extends Component {

    showInfo = () => {
        const { setAlertOptions, setShowAlert } = this.props
        setAlertOptions({
            title: 'Background Lock',
            message: 'This will quickly lock your app once you send it to background or lock the screen',
            showConfirmButton: true,
            confirmText: 'OK',
        })
        setShowAlert(true)
    }

    onToggle = value => {
        const { upsertSettings } = this.props
        upsertSettings({
            key: 'backgroundLock',
            value
        })
    }

    render() {
        const { backgroundLock } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.itemText}>Lock When In Background</Text>
                    <TouchableOpacity onPress={this.showInfo}>
                        <View style={styles.infoOuterContainer}>
                            <View style={styles.infoInnerContainer}>
                                <Text style={styles.infoText}>i</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Switch
                    value={backgroundLock === 1}
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
        backgroundLock: state.settings.backgroundLock
    }
}

const mapDispatchToProps = dispatch => {
    return {
        upsertSettings: data => dispatch(upsertSettings(data)),
        setShowAlert: (show) => dispatch(setShowAlert(show)),
        setAlertOptions: (data) => dispatch(setAlertOptions(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BackgroundLock)