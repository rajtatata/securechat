import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'

import RootNavigator from './src/navigation/RootNavigator'
import { navigationRef } from './src/navigation/NavigationRef'
import { dropDownAlertRef } from './src/components/DropDownAlert/DropDownAlertRef'
import Alert from './src/components/Alert/Alert'
import configureStore from './src/store/configureStore'
import colors from './assets/colors'

const store = configureStore()

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <DropdownAlert
                        ref={dropDownAlertRef}
                        successImageSrc={require('./assets/icon_logo.png')}
                        successColor={colors.gray.one}
                        zIndex={10}
                        updateStatusBar={false}
                        defaultContainer={{
                            padding: 8,
                            flexDirection: 'row',
                            paddingTop: 40,
                        }}
                    />
                    <RootNavigator ref={navigationRef} />
                    <Alert />
                </View>
            </Provider>
        )
    }
}

export default App