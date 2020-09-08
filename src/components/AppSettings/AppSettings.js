import React, { Component } from 'react'

import SettingsView from './SettingsView/SettingsView'
import ChangeName from './ChangeName/ChangeName'
import ChangePassword from './ChangePassword/ChangePassword'
import ResetApp from './ResetApp/ResetApp'
import { setItemPressed } from '../MyProfile/MyProfileHeader/MyProfileHeader'

class AppSettings extends Component {

    componentWillUnmount = () => {
        setItemPressed(false)
    }

    goTo = (view) => {
        if (view === "settings") {
            this.setState({
                currentView: <SettingsView changeView={this.goTo} />
            })
        } else if (view === "changeName") {
            this.setState({
                currentView: <ChangeName changeView={this.goTo} />
            })
        } else if (view === "changePassword") {
            this.setState({
                currentView: <ChangePassword changeView={this.goTo} />
            })
        } else if (view === "reset") {
            this.setState({
                currentView: <ResetApp changeView={this.goTo} />
            })
        }
    }

    state = {
        currentView: <SettingsView changeView={this.goTo} />
    }


    render() {
        return this.state.currentView
    }
}

export default AppSettings