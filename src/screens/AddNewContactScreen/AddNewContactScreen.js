import React, { Component } from 'react'

import AddNewContact from '../../components/AddNewContact/AddNewContact'

class AddNewContactScreen extends Component {
    static navigationOptions = ({ navigation }) => {

        return {
            header: null,
        }
    }

    render() {
        return (
            <AddNewContact />
        )
    }
}

export default AddNewContactScreen