import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

import MyProfileHeader from '../../components/MyProfile/MyProfileHeader/MyProfileHeader'
import MyProfile from '../../components/MyProfile/MyProfile'
import colors from '../../../assets/predefinedColors/predefinedColors'

class ProfileScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: MyProfileHeader,
            headerStyle: {
                backgroundColor: colors.white,
                elevation: 0,
                shadowColor: colors.white,
                borderBottomWidth: 0,
            }
        }
    }

    state = {
        myProfileComponent: false
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                myProfileComponent: true
            })
        }, 10)
    }

    render() {
        let myProfile = <ActivityIndicator size="large" color={colors.black} />
        if (this.state.myProfileComponent) {
            myProfile = <MyProfile />
        }
        return (
            <View style={styles.container}>
                {myProfile}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
})

export default ProfileScreen