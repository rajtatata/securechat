import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'

import colors from '../../../assets/colors'

class Pagination extends Component {
    render() {
        const { pages, skipSlide, actionTitle } = this.props
        return (
            <View style={styles.paginationContainer}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            pages.map(({ selected }, index) => {
                                if (selected) {
                                    return <View key={index} style={styles.selectedPage}></View>
                                }
                                return <View key={index} style={styles.unSelectedPage}></View>
                            })
                        }
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={skipSlide}>
                        {
                            pages[pages.length - 1].selected ?
                                <View style={{ padding: 15, paddingLeft: 30, paddingRight: 30, backgroundColor: '#88698E', borderRadius: 50 }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{actionTitle}</Text>
                                </View> :
                                <View style={{ padding: 10, }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Skip</Text>
                                </View>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    paginationContainer: {
        height: 70,
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center'
    },
    selectedPage: {
        backgroundColor: colors.white.one,
        padding: 7,
        margin: 5,
        borderRadius: 20,
    },
    unSelectedPage: {
        backgroundColor: '#9984A1',
        padding: 5,
        margin: 5,
        borderRadius: 20,
    }
})

export default Pagination