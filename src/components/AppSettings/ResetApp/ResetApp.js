import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import { resetDb } from '../../../util/database'

class ResetApp extends Component {

    state = {
        loading: false
    }

    settingsView = () => {
        this.props.changeView("settings")
    }

    onReset = () => {
        const { dbConn, navigation } = this.props

        this.setState({
            loading: true
        }, () => {
            resetDb(dbConn)
                .then(() => {
                    navigation.navigate("SplashScreen")
                })
                .catch(err => {
                    // console.log(err)
                })
        })
    }

    render() {
        let submitButton = (
            <TouchableOpacity onPress={this.onReset}>
                <View style={[styles.buttonContainer, { backgroundColor: colors.red }]}>
                    <Text style={styles.buttonText}>Reset</Text>
                </View>
            </TouchableOpacity>
        )
        if (this.state.loading) {
            submitButton = (
                <View style={[styles.buttonContainer, { backgroundColor: colors.red }]}>
                    <ActivityIndicator size="small" color={colors.white} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTextHeading}>Reset App</Text>
                    <Text style={styles.infoText}>This will delete all your application data. You will lose all your messages, all your contacts and your keys. It will be just like a fresh install.</Text>
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
        color: colors.red,
        textAlign: "center"
    },
    infoText: {
        fontSize: 12,
        color: colors.darkBlack,
        textAlign: "center"
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
        // marginRight: 10,
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
export default connect(mapStateToProps, null)(withNavigation(ResetApp))