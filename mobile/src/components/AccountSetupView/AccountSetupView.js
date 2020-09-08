import React, { Component } from 'react'
import { ScrollView, StyleSheet, Dimensions, Keyboard } from 'react-native'

import colors from '../../../assets/colors'
import GradientBackground from '../GradientBackground/GradientBackground'
import SetupName from './SetupName'
import SetupPassword from './SetupPassword'
import LoadingThings from './LoadingThings'

class AccountSetupView extends Component {

    state = {
        focusedElement: 'name',
        full_name: null,
        password: null,
        confirmPassword: null,
        startSignup: false
    }

    scrollTo = (page) => {
        this.scrollView.scrollTo({
            x: page * Dimensions.get('window').width,
            y: 0,
            animated: true
        })
        if (page === 1) {
            this.setState({ focusedElement: 'password' })
        }
        if (page === 2) {
            this.setState({ startSignup: true })
            Keyboard.dismiss()
        }
    }

    setFullName = full_name => {
        this.setState({
            full_name
        })
    }

    setPassword = password => {
        this.setState({
            password
        })
    }

    setConfirmPassword = confirmPassword => {
        this.setState({
            confirmPassword
        })
    }

    render() {
        const { focusedElement, full_name, password, startSignup, confirmPassword } = this.state
        return (
            <GradientBackground
                colors={[colors.gray.two, colors.pink.four]}>
                <ScrollView
                    scrollEnabled={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'
                    pagingEnabled={true}
                    style={styles.scrollView}
                    ref={ref => this.scrollView = ref} >
                    <SetupName
                        scrollTo={this.scrollTo}
                        focusedElement={focusedElement}
                        setFullName={this.setFullName}
                        full_name={full_name} />
                    <SetupPassword
                        scrollTo={this.scrollTo}
                        focusedElement={focusedElement}
                        setPassword={this.setPassword}
                        setConfirmPassword={this.setConfirmPassword}
                        password={password}
                        confirmPassword={confirmPassword} />
                    <LoadingThings
                        full_name={full_name}
                        password={password}
                        startSignup={startSignup} />
                </ScrollView>
            </GradientBackground>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
})

export default AccountSetupView