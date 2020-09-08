import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import SingleLetter from './SingleLetter'

class LetterSlider extends Component {

    state = {
        elementHeight: null,
        movingSlider: false
    }

    containerPageY = null

    shouldComponentUpdate = (nextProps, nextState) => {
        // find container pageY as soon as possible
        if (this.state.elementHeight === null && nextState.elementHeight != null) {
            if (!this.containerPageY) {
                this.containerViewRef.measure((x, y, width, height, pageX, pageY) => {
                    this.containerPageY = pageY
                })
            }
        }

        return true
    }

    onResponderRelease = evt => {
        this.setState({ movingSlider: false })
        this.props.setLetterScrolling(false)
    }

    onResponderMove = evt => {
        const { elementHeight, movingSlider } = this.state
        if (!movingSlider) {
            this.props.setLetterScrolling(true)
            this.setState({ movingSlider: true })
        }
        const { letters } = this.props
        const { pageY } = evt.nativeEvent

        let letterIndex = Math.floor((pageY - this.containerPageY) / elementHeight)

        if (letterIndex > letters.length - 1) letterIndex = letters.length - 1
        if (letterIndex < 0) letterIndex = 0
        this.props.setChosenLetter(letters[letterIndex])
    }

    render() {
        const { elementHeight, movingSlider } = this.state
        const { letters, choosenLetter } = this.props
        const maxHeight = 40

        return (
            <View style={styles.alphabetSliderContainer}
                ref={ref => this.containerViewRef = ref}
                onLayout={evt => {
                    const { height, width, x, y } = evt.nativeEvent.layout
                    if (!elementHeight) {
                        let h = height / letters.length
                        h = h > maxHeight ? maxHeight : h

                        this.setState({
                            elementHeight: h
                        })
                    }
                }}>
                {elementHeight ? letters.map((l, myIndex) => {
                    return (
                        <SingleLetter
                            key={myIndex}
                            l={l}
                            choosenLetter={choosenLetter}
                            elementHeight={elementHeight}
                            movingSlider={movingSlider}
                            onResponderMove={this.onResponderMove}
                            onResponderRelease={this.onResponderRelease} />
                    )
                }) : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    alphabetSliderContainer: {
        // width: 60,
    }
})

export default LetterSlider