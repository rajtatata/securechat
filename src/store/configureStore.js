import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import messagesReducer from './reducers/messages'
import contactsReducer from './reducers/contacts'
import databaseReducer from './reducers/database'
import adminReducer from './reducers/admin'
import alertReducer from './reducers/alert'
import realtimeDbReducer from './reducers/realtimeDb'
import deleteReducer from './reducers/delete'
import networkConnection from './reducers/networkConnection'
import messageNotifications from './reducers/messageNotifications'

const rootReducer = combineReducers({
    messages: messagesReducer,
    contacts: contactsReducer,
    database: databaseReducer,
    admin: adminReducer,
    alert: alertReducer,
    realtimeDb: realtimeDbReducer,
    delete: deleteReducer,
    network: networkConnection,
    messageNotifications: messageNotifications
})

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk))
}

export default configureStore