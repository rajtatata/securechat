import { createStackNavigator } from "react-navigation"

// screen
import ContactListScreen from '../../screens/ContactListScreen/ContactListScreen'

const contactListStack = createStackNavigator({
    ContactList: {
        screen: ContactListScreen,
    }
})


export default contactListStack