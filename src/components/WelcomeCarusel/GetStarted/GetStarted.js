import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Keyboard } from 'react-native'

import colors from '../../../../assets/predefinedColors/predefinedColors'
import GetStartedDisplayName from './GetStartedDisplayName/GetStartedDisplayName'
import GetStartedPassword from './GetStartedPassword/GetStartedPassword'
import GetStartedLoading from './GetStartedLoading/GetStartedLoading'

class GetStarted extends Component {
    state = {
        currentPage: 0,
        maxPage: 2,
        inputData: {
            displayName: "",
            password: "",
            confirmPassword: "",
            startProcess: false
        },
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

    onNextButtonClick = () => {
        if (this.state.currentPage === this.state.maxPage) {
            return
        }

        if (this.state.currentPage === 0 && this.state.inputData.displayName === "") {
            alert("Display name cannot be empty")
            return
        }

        if (this.state.currentPage === 1 && this.state.inputData.password === "") {
            alert("Password cannot be empty")
            return
        }

        if (this.state.currentPage === 1 && this.state.inputData.password !== this.state.inputData.confirmPassword) {
            alert("Confirm password does not match")
            return
        }

        let startProcess = false
        if (this.state.currentPage === this.state.maxPage - 1) {
            startProcess = true
        }

        const nextPage = this.state.currentPage + 1
        const frameWidth = Dimensions.get('window').width
        if (this.scrollView) {
            this.scrollView.scrollTo({ x: frameWidth * nextPage, y: 0 })
        }
        this.setState({
            currentPage: nextPage,
            startProcess: startProcess
        })
    }

    setDisplayName = (name) => {
        this.setState(prevState => {
            return {
                ...prevState,
                inputData: {
                    ...prevState.inputData,
                    displayName: name
                }
            }
        })
    }

    setPassword = (password) => {
        this.setState(prevState => {
            return {
                ...prevState,
                inputData: {
                    ...prevState.inputData,
                    password: password
                }
            }
        })
    }

    setConfirmPassword = (confirmPassword) => {
        this.setState(prevState => {
            return {
                ...prevState,
                inputData: {
                    ...prevState.inputData,
                    confirmPassword: confirmPassword
                }
            }
        })
    }

    onPreviousButtonClick = () => {
        if (this.state.currentPage === 0) {
            return
        }

        const prevPage = this.state.currentPage - 1
        const frameWidth = Dimensions.get('window').width
        if (this.scrollView) {
            this.scrollView.scrollTo({ x: frameWidth * prevPage, y: 0 })
        }
        this.setState({
            currentPage: prevPage
        })
    }

    render() {
        return (
            <View style={[styles.container, { marginBottom: this.state.viewMarginBottom }]}>
                <View style={[styles.headingContainer, { display: this.state.viewMarginBottom > 0 ? "none" : "flex" }]}>
                    <Text style={styles.headingText}>Get</Text>
                    <Text style={styles.headingText}>Started</Text>
                </View>
                <View style={[styles.scrollAndButtonContainer, { justifyContent: this.state.viewMarginBottom > 0 ? "center" : "flex-start" }]}>
                    <View style={styles.scrollViewContainer}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                            ref={elem => this.scrollView = elem}
                            scrollEnabled={false} >
                            <GetStartedDisplayName setDisplayName={this.setDisplayName} onTextInputSubmit={this.onNextButtonClick} />
                            <GetStartedPassword setPassword={this.setPassword} setConfirmPassword={this.setConfirmPassword} onTextInputSubmit={this.onNextButtonClick} />
                            <GetStartedLoading startProcess={this.state.startProcess} fullName={this.state.inputData.displayName} passCode={this.state.inputData.password} />
                        </ScrollView>
                    </View>
                    <View style={[styles.buttonOuterContainer, { display: this.state.currentPage === this.state.maxPage ? "none" : "flex" }]}>
                        <View>
                            <TouchableOpacity onPress={this.onPreviousButtonClick} >
                                <View style={[styles.buttonContainer, {
                                    display: this.state.currentPage === 0 ? "none" : "flex",
                                    backgroundColor: this.state.currentPage === 0 ? colors.darkBlack : colors.white,
                                    borderColor: this.state.currentPage === 0 ? colors.darkBlack : colors.lightGray
                                }]}>
                                    <Text style={styles.button}>Back</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.onNextButtonClick}>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.button}>Next</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: Dimensions.get('window').width,
        backgroundColor: colors.darkBlack,
    },
    scrollViewContainer: {

    },
    headingContainer: {
        flexDirection: "column",
        marginTop: "15%",
        padding: 10,
        width: "100%",
    },
    headingText: {
        color: colors.white,
        fontSize: 30,
        fontWeight: "bold",
    },
    buttonOuterContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
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
    },
    scrollAndButtonContainer: {
        flex: 1,
        width: "100%",
    }
})

export default GetStarted