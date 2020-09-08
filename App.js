import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootNavigator from './src/navigations/RootNavigator/RootNavigator'

import configureStore from './src/store/configureStore'

const store = configureStore()

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootNavigator />
            </Provider>
        )
    }
}

export default App