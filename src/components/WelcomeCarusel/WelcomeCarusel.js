import React, { Component } from 'react'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'

import WelcomeMessage from './WelcomeMessage/WelcomeMessage'
import SecurityView from './SecurityView/SecurityView/'
import ContactsView from './ContactsView/ContactsView'
import GetStarted from './GetStarted/GetStarted'

class WelcomeCarusel extends Component {
    state = {
        currentPage: 0
    }
    
    onNextButtonClick = () => {
        const nextPage = this.state.currentPage + 1
        const frameWidth = Dimensions.get('window').width
        if (this.scrollView) {
            this.scrollView.scrollTo({ x: frameWidth * nextPage, y: 0 })
        }
        this.setState({
            currentPage: nextPage
        })
    }

    render() {
        return (
            <ScrollView
                style={styles.scrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                ref={elem => this.scrollView = elem}
                scrollEnabled={false} >
                <WelcomeMessage onNextButtonClick={this.onNextButtonClick} />
                <SecurityView onNextButtonClick={this.onNextButtonClick} />
                <ContactsView onNextButtonClick={this.onNextButtonClick} />                
                <GetStarted />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        
    }
})

export default WelcomeCarusel