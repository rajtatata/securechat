import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import color from '../../../../assets/colors'

class SingleLetter extends Component {
    shouldComponentUpdate = (nextProps, nextState) => {
        const { choosenLetter, l, movingSlider } = this.props
        // cases when to update

        // if I was selected and then not selected
        if (choosenLetter === l && nextProps.choosenLetter !== l) return true


        // if I was not selected and then selected
        if (choosenLetter !== l && nextProps.choosenLetter === l) return true


        // if is selected and moving changed
        if (choosenLetter === l && nextProps.choosenLetter === l && movingSlider !== nextProps.movingSlider) return true

        // if letter changes
        if (l !== nextProps.l) return true

        return false
    }

    render() {
        const { l, choosenLetter, elementHeight, movingSlider, onResponderMove, onResponderRelease } = this.props
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    display: choosenLetter === l && movingSlider ? 'flex' : 'none',
                }}>
                    <View style={{
                        backgroundColor: 'gray',
                        padding: 10,
                        position: 'absolute',
                        right: 10,
                        borderRadius: 10,
                    }}>
                        <Text style={{ color: 'white', fontSize: 25 }}>{l}</Text>
                    </View>
                </View>
                <View
                    style={[styles.alphabetLetterContainer, { height: elementHeight, }]}
                    onMoveShouldSetResponder={evt => true}
                    onResponderMove={onResponderMove}
                    onResponderRelease={onResponderRelease}>
                    <Text style={{
                        fontSize: choosenLetter === l ? 25 : 18,
                        color: choosenLetter === l ? color.black.one : color.black.two,
                        fontWeight: choosenLetter === l ? 'bold' : '400',
                    }}>{l}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    alphabetLetterContainer: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // on android had difficulties registering touches on view without setting borders
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 1
    }
})

export default SingleLetter