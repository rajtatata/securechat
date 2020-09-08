import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import alertReducer from './reducers/alert'
import adminReducer from './reducers/admin'
import databaseReducer from './reducers/database'
import contactReducer from './reducers/contact'
import messageReducer from './reducers/message'
import loadersReducer from './reducers/loaders'
import deleteReducer from './reducers/delete'
import socketioReducer from './reducers/socketio'
import settingsReducer from './reducers/settings'

const rootReducer = combineReducers({
    alert: alertReducer,
    admin: adminReducer,
    database: databaseReducer,
    contacts: contactReducer,
    messages: messageReducer,
    loaders: loadersReducer,
    socketio: socketioReducer,
    delete: deleteReducer,
    settings: settingsReducer
})

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk))
}

export default configureStore