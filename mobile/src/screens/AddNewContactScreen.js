import React, { Component } from 'react'

import AddNewContactView from '../components/AddNewContactView/AddNewContactView'

class AddNewContactScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        }
    }

    render() {
        return (
            <AddNewContactView />
        )
    }
}

export default AddNewContactScreen