import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import LetterSlider from './Letters/LetterSlider'
import ContentData from './Data/ContentData'

class AlphabetSlider extends Component {

    state = {
        choosenLetter: '',
        letterScrolling: false
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.props.data !== nextProps.data) {
            this.letters = this.parseLetters(nextProps.data)
        }

        return true
    }

    componentDidMount = () => {
        // data = [{letter: '', sortName: '', view: <JSX>}]
        const { data } = this.props
        this.letters = this.parseLetters(data)

        this.setState({
            choosenLetter: this.letters[0]
        })
    }

    parseLetters = data => {
        const firstLetters = data.map(n => n.letter)
        // remove duplicates
        return firstLetters.filter((item, index) => firstLetters.indexOf(item) === index).sort()
    }

    render() {
        const { data, refreshControl } = this.props
        const { choosenLetter, letterScrolling } = this.state

        return (
            <View style={styles.mainContainer}>
                <ContentData
                    choosenLetter={choosenLetter}
                    data={data}
                    setChosenLetter={(l) => this.setState({ choosenLetter: l })}
                    letterScrolling={letterScrolling}
                    refreshControl={refreshControl} />
                <LetterSlider
                    setChosenLetter={(l) => this.setState({ choosenLetter: l })}
                    letters={this.letters}
                    choosenLetter={choosenLetter}
                    setLetterScrolling={(letterScrolling) => this.setState({ letterScrolling })} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row'
    },
})

export default AlphabetSlider