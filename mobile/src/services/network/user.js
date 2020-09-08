import { BASE_URL } from '../../config/environment'
import axios from 'axios'

export const signup = async ({ expoPushToken = 'none', installationId }) => {
    return await axios.post(`${BASE_URL}/user`,
        { expoPushToken, installationId },
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.data
        }).then(data => {
            if (data.status) {
                return data.user
            }
            return null
        }).catch(err => {
            console.log(err)
            return null
        })
}

export const randomAvatar = async () => {
    return await axios.get(`${BASE_URL}/user/avatar`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.data
        }).then(data => {
            if (data.status) {
                return data.avatar
            }
            return null
        }).catch(err => {
            console.log(err)
            return null
        })
}

export const avatarThumbnails = async () => {
    return await axios.get(`${BASE_URL}/user/avatar-thumbnails`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.data
        }).then(data => {
            if (data.status) {
                return data.avatars
            }
            return null
        }).catch(err => {
            console.log(err)
            return null
        })
}

export const reset = async ({ userId, installationId }) => {
    return await axios.patch(`${BASE_URL}/user/reset`,
        null,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'userId': userId,
                'installationId': installationId
            }
        }).then(response => {
            return response.data
        }).then(data => {
            if (data.status) {
                return true
            }
            return null
        }).catch(err => {
            console.log(err)
            return null
        })
}

export const updateNotifications = async ({ userId, installationId, acceptNotifications }) => {
    return await axios.patch(`${BASE_URL}/user/notifications`,
        { acceptNotifications },
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'userId': userId,
                'installationId': installationId
            }
        }).then(response => {
            return response.data
        }).then(data => {
            if (data.status) {
                return true
            }
            return null
        }).catch(err => {
            console.log(err)
            return null
        })
}