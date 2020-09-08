const express = require('express')
const router = express.Router()

const { randomAvatar, resetApp, signup, updateNotifications, getAvatarThumbnails } = require('../controllers/user')

router.post('/', signup)
router.get('/avatar', randomAvatar)
router.get('/avatar-thumbnails', getAvatarThumbnails)
router.patch('/reset', resetApp)
router.patch('/notifications', updateNotifications)

module.exports = router