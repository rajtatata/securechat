import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, findNodeHandle } from 'react-native'

class ContentData extends Component {

    dataRefs = {}

    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.props.choosenLetter !== nextProps.choosenLetter && nextProps.letterScrolling) {
            if (this.dataRefs[nextProps.choosenLetter]) {
                if (this.dataRefs[nextProps.choosenLetter].y) {
                    this.scrollView.scrollTo({ x: 0, y: this.dataRefs[nextProps.choosenLetter].y, animated: false })
                } else {
                    this.dataRefs[nextProps.choosenLetter].ref.measureLayout(
                        findNodeHandle(this.scrollView),
                        (x, y) => {
                            this.dataRefs[nextProps.choosenLetter].y = y
                            this.scrollView.scrollTo({ x: 0, y: y, animated: false })
                        }
                    )
                }
            }
        }

        if (this.props.data != nextProps.data) return true

        return false
    }

    onScroll = evt => {
        const { letterScrolling, setChosenLetter } = this.props
        const yOffset = evt.nativeEvent.contentOffset.y

        if (!letterScrolling) {
            let maxChar = Object.keys(this.dataRefs)[0]
            Object.keys(this.dataRefs).forEach(l => {
                if (!this.dataRefs[l].y && this.dataRefs[l].y !== 0) {
                    this.dataRefs[l].ref.measureLayout(
                        findNodeHandle(this.scrollView),
                        (x, y) => {
                            this.dataRefs[l].y = y
                            if (y <= yOffset) {
                                maxChar = l
                            } else {
                                setChosenLetter(maxChar)
                                return
                            }
                        }
                    )
                } else {
                    if (this.dataRefs[l].y <= yOffset) {
                        maxChar = l
                    } else {
                        setChosenLetter(maxChar)
                        return
                    }
                }

            })
        }
    }

    render() {
        // data = [{letter: '', sortName: '', view: <JSX>}]
        const { data, refreshControl } = this.props

        return (
            <View style={styles.contentContainer}>
                <ScrollView
                    ref={elem => this.scrollView = elem}
                    style={styles.scrollView}
                    scrollEventThrottle={1}
                    onScroll={this.onScroll}
                    showsVerticalScrollIndicator={false}
                    refreshControl={refreshControl} >
                    {
                        data.sort((a, b) => (a.sortName > b.sortName) ? 1 : -1).map((elem, index) => {
                            // save ref of first element of a letter
                            return (
                                <View
                                    key={index}
                                    // style={elem.view.props.style} // copies the container style
                                    ref={ref => {
                                        if (!this.dataRefs[elem.letter]) {
                                            this.dataRefs[elem.letter] = { ref: ref }
                                        }
                                    }}>
                                    {elem.view}
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1
    },
    scrollView: {
        flex: 1
    },
})

export default ContentData