import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'

import FirstSlide from './FirstSlide'
import SecondSlide from './SecondSlide'
import ThirdSlide from './ThirdSlide'
import Pagination from './Pagination'

class WelcomeView extends Component {

    state = {
        pages: [
            { selected: true },
            {},
            {}
        ]
    }

    skipSlide = () => {
        const { pages } = this.state
        const currentPage = pages.findIndex(el => el.selected)
        const totalPages = pages.length

        // check last page
        if (currentPage + 1 === totalPages) {
            return this.openApp()
        }

        this.scrollView.scrollTo({
            x: (currentPage + 1) * Dimensions.get('window').width,
            y: 0,
            animated: true
        })

        this.setState({
            pages: pages.map((_, index) => {
                return index === currentPage + 1 ? { selected: true } : {}
            })
        })
    }

    openApp = () => {
        const { navigation } = this.props
        navigation.navigate('AccountSetupScreen')
    }

    render() {
        const { pages } = this.state
        return (
            <View style={styles.container}>
                <ScrollView
                    style={{ flex: 1 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    scrollEnabled={false}
                    ref={ref => this.scrollView = ref} >
                    <FirstSlide />
                    <SecondSlide />
                    <ThirdSlide />
                </ScrollView>
                <Pagination pages={pages} skipSlide={this.skipSlide} actionTitle={'Open app!'} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default withNavigation(WelcomeView)