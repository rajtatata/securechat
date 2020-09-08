import { createStackNavigator } from "react-navigation"

// screen
import MyProfileScreen from '../../screens/MyProfileScreen/MyProfileScreen'

const profileStack = createStackNavigator({
    MyProfile: {
        screen: MyProfileScreen,
    }
})

export default profileStack