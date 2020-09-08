import { createStackNavigator } from "react-navigation"

// screen
import ChatListScreen from '../../screens/ChatListScreen/ChatListScreen'

const chatListStack = createStackNavigator({
    ChatList: {
        screen: ChatListScreen,
    }
}, {
    headerLayoutPreset: "left"
})


export default chatListStack