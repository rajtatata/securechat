import React, { Component } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
import { StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import { setAlertOptions, setShowAlert } from '../../store/actions/alert'
import colors from '../../../assets/colors'

class Alert extends Component {
    hideAlert = () => {
        const { setShowAlert, setAlertOptions } = this.props
        setShowAlert(false)
        setAlertOptions({
            title: null,
            message: null,
            showCancelButton: null,
            showConfirmButton: null,
            cancelText: null,
            confirmText: null,
            onCancelPressed: null,
            onConfirmPressed: null
        })
    }

    render() {
        const { show, title, message, showCancelButton, showConfirmButton, cancelText, confirmText, onCancelPressed, onConfirmPressed } = this.props
        return (
            <AwesomeAlert
                show={show}
                showProgress={false}
                title={title || ''}
                message={message || ''}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={showCancelButton || false}
                showConfirmButton={showConfirmButton || false}
                cancelText={cancelText || ''}
                confirmText={confirmText || ''}
                confirmButtonColor={colors.pink.one}
                onCancelPressed={onCancelPressed || this.hideAlert}
                onConfirmPressed={onConfirmPressed || this.hideAlert}
                overlayStyle={styles.overlay}
                titleStyle={styles.title}
                messageStyle={styles.message}
                cancelButtonTextStyle={styles.buttonText}
                confirmButtonTextStyle={styles.buttonText}
            />
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'absolute',
        backgroundColor: 'rgba(52,52,52,0.5)'
    },
    title: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: colors.black.one,
        fontSize: 20
    },
    message: {
        paddingTop: 5,
        color: colors.black.two,
        fontSize: 16,
        textAlign: 'center'
    },
    buttonText: {
        color: colors.white.one,
        fontSize: 15
    }
})

const mapStateToProps = state => {
    return {
        show: state.alert.show,
        title: state.alert.options.title,
        message: state.alert.options.message,
        showCancelButton: state.alert.options.showCancelButton,
        showConfirmButton: state.alert.options.showConfirmButton,
        cancelText: state.alert.options.cancelText,
        confirmText: state.alert.options.confirmText,
        onCancelPressed: state.alert.options.onCancelPressed,
        onConfirmPressed: state.alert.options.onConfirmPressed
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setShowAlert: (show) => dispatch(setShowAlert(show)),
        setAlertOptions: (data) => dispatch(setAlertOptions(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Alert)