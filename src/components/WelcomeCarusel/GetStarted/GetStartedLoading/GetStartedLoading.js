import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import nacl from 'tweet-nacl-react-native-expo'
import { withNavigation } from 'react-navigation'

import { setAdmin } from '../../../../store/actions/admin'
import { insertAdmin } from '../../../../util/database'
import { generateKeys, encryptPrivateKey } from '../../../../util/encryption'
import { getUserId, getRandomAvatar } from '../../../../util/server'
import colors from '../../../../../assets/predefinedColors/predefinedColors'

class GetStartedLoading extends Component {
    status = {
        waiting: <Text style={styles.itemText}>...</Text>,
        processing: <ActivityIndicator size="small" color={colors.white} />,
        done: <Ionicons name="md-checkmark" size={20} color={colors.white} />
    }

    state = {
        creatingDb: "waiting",
        generatingKeys: "waiting",
        encryptingPrivateKey: "waiting",
        savingAdmin: "waiting",
        done: false,
        started: false
    }

    navigateToMainApp = () => {
        this.props.navigation.navigate("MainApp")
    }

    componentDidUpdate = () => {
        if (this.props.startProcess && !this.state.started) {
            this.startProcess()
        }
    }

    createAdmin = (fullName, keyGenerationData) => {
        // first get id and avatar from server 
        return new Promise((resolve, reject) => {
            let publicKey, privateKeyDecrypted, id, email = "N/A", avatar

            getUserId()
                .then(uid => {
                    id = uid

                    return getRandomAvatar()
                })
                .then(avatarUri => {
                    avatar = avatarUri
                    publicKey = keyGenerationData.publicKey
                    privateKeyDecrypted = keyGenerationData.privateKeyDecrypted

                    return insertAdmin(
                        this.props.dbConn,
                        {
                            id: id,
                            fullName: fullName,
                            publicKey: keyGenerationData.publicKeyBase64,
                            privateKey: keyGenerationData.privateKeyBase64,
                            privateKeyNonce: keyGenerationData.nonceBase64,
                            avatar: avatar
                        })
                })
                .then(() => {
                    resolve({
                        id, fullName, email, privateKey: privateKeyDecrypted, publicKey, avatar
                    })
                }).catch(err => {
                    reject(err)
                })
        })
    }

    keyGenerationProcess = (passCode) => {
        return new Promise((resolve, reject) => {
            let publicKey,
                privateKey,
                publicKeyBase64,
                privateKeyBase64,
                nonce,
                nonceBase64,
                privateKeyDecrypted

            generateKeys()
                .then(keyPair => {
                    publicKey = keyPair.publicKey
                    privateKeyDecrypted = keyPair.secretKey

                    this.setState({
                        generatingKeys: "done",
                        encryptingPrivateKey: "processing"
                    })

                    return encryptPrivateKey(keyPair.secretKey, passCode)
                })
                .then(result => {
                    privateKey = result.encryptedPrivateKey
                    nonce = result.nonce

                    publicKeyBase64 = nacl.util.encodeBase64(publicKey)
                    privateKeyBase64 = nacl.util.encodeBase64(privateKey)
                    nonceBase64 = nacl.util.encodeBase64(nonce)

                    resolve({
                        publicKey,
                        privateKey,
                        nonce,
                        publicKeyBase64,
                        privateKeyBase64,
                        nonceBase64,
                        privateKeyDecrypted
                    })
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    startProcess = async () => {
        const { fullName, passCode } = this.props

        // generate keys and encrypting private key
        this.setState({
            started: true,
            creatingDb: "done",
            generatingKeys: "processing"
        })

        this.keyGenerationProcess(passCode)
            .then(keyGenerationData => {
                // save admin to db
                this.setState({
                    encryptingPrivateKey: "done",
                    savingAdmin: "processing"
                })
                return this.createAdmin(fullName, keyGenerationData)
            })
            .then(admin => {
                this.props.setAdmin(admin)
                this.setState({
                    savingAdmin: "done",
                    done: true
                })
            })
            .catch(err => {
                // console.log(err)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>Creating database</Text>
                    {this.status[this.state.creatingDb]}
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>Generating keys</Text>
                    {this.status[this.state.generatingKeys]}
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>Encrypting Private key</Text>
                    {this.status[this.state.encryptingPrivateKey]}
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>Saving Admin to database</Text>
                    {this.status[this.state.savingAdmin]}
                </View>
                <View style={[styles.doneContainer, { display: this.state.done ? "flex" : "none" }]}>
                    <Text style={styles.doneText}>All Done</Text>
                    <View>
                        <TouchableOpacity onPress={this.navigateToMainApp}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.button}>Open App</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        padding: 20,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    itemText: {
        fontSize: 15,
        color: colors.white,
        marginRight: 10,
    },
    doneContainer: {
        alignItems: "center",
        padding: 10,
        flexDirection: "column",
    },
    doneText: {
        fontSize: 20,
        color: colors.white,
        fontWeight: "bold",
        marginBottom: 10
    },
    buttonContainer: {
        borderWidth: 2,
        borderColor: colors.lightGray,
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.white,
    },
    button: {
        fontSize: 15,
        color: colors.black,
        textAlign: "center",
    }
})

const mapStateToProps = (state) => {
    return {
        dbConn: state.database.conn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAdmin: (admin) => dispatch(setAdmin(admin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(GetStartedLoading))