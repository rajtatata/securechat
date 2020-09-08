import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

import colors from '../../../assets/colors'
import GradientBackground from '../GradientBackground/GradientBackground'
import { avatarThumbnails } from '../../services/network/user'
import { setAdmin as setAdminRedux } from '../../store/actions/admin'
import { updateAdmin as updateAdminDb } from '../../services/database/admin'

class ChangePictureView extends Component {

    state = {
        selected: null,
        thumbnails: []
    }

    componentDidMount = async () => {
        const thumbnails = await avatarThumbnails()

        if (thumbnails) {
            this.setState({ thumbnails })
        }
    }

    onSave = () => {
        const { selected, thumbnails } = this.state
        const { admin, setAdminRedux, navigation, conn } = this.props

        if (selected || selected == 0) {
            setAdminRedux({
                ...admin,
                avatar: thumbnails[selected]
            })
            updateAdminDb(conn, {
                avatar: thumbnails[selected]
            })
            navigation.goBack()
        }
    }

    render() {
        const { selected, thumbnails } = this.state
        return (
            <GradientBackground>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContainer}>
                    {
                        thumbnails.map((url, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => this.setState({ selected: index })}>
                                    <View
                                        style={selected === index ? styles.imageContainerSelected : styles.imageContainer}>
                                        <Image source={{ uri: url }}
                                            style={selected === index ? styles.imageSelected : styles.image}
                                            resizeMode='contain' />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                <View style={styles.buttonOuterContainer}>
                    <TouchableOpacity onPress={this.onSave}>
                        <View style={styles.buttonInnerContainer}>
                            <Text style={styles.buttonText}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </GradientBackground>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    },
    scrollViewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonOuterContainer: {
        padding: 10,
        paddingBottom: 30,
        paddingTop: 30
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
    imageContainer: {
        width: 80,
        height: 80,
        margin: 10,
    },
    imageContainerSelected: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderColor: colors.pink.two,
        borderWidth: 4,
        margin: 10,
    },
    image: {
        width: 80,
        height: 80
    },
    imageSelected: {
        width: 70,
        height: 70
    }
})

const mapStateToProps = state => {
    return {
        conn: state.database.conn,
        admin: state.admin.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAdminRedux: data => dispatch(setAdminRedux(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ChangePictureView))