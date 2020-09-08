import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, Dimensions } from 'react-native'

import colors from '../../assets/colors'
import ProfileView from '../components/ProfileView/ProfileView'
import HeaderRight from '../components/ProfileView/HeaderRight'
import GradientBackground from '../components/GradientBackground/GradientBackground'

class MyProfileScreen extends Component {
    state = {
        loading: true
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 200)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My profile',
            headerRight: <HeaderRight />,
            headerStyle: {
                backgroundColor: colors.gray.two,
                elevation: 0,
                borderBottomWidth: 0
            },
            headerTintColor: colors.white.one,
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 35,
                color: colors.black.one
            },

        }
    }

    render() {
        const { loading } = this.state
        if (loading) {
            return (
                <GradientBackground style={{
                    justifyContent: 'center', alignItems: 'center', flex: 1
                }}>
                    <ActivityIndicator size='large' color={colors.black.one} />
                </GradientBackground>)
        }
        return (
            <ProfileView user={this.props.admin} isAdmin />
        )
    }
}

const mapStateToProps = state => {
    return {
        admin: state.admin.data
    }
}
export default connect(mapStateToProps)(MyProfileScreen)