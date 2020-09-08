import { BASE_URL } from '../../config/environment'
import axios from 'axios'

export const deleteMessage = async ({ userId, installationId, messageIds }) => {
    return await axios.post(`${BASE_URL}/message/delete`,
        { messageIds },
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