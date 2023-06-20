const express = require('express')
const router = express.Router()
const User = require('../controllers/userAuthorization')
const Session = require('../controllers/userSession')

router.post('/registration', User.registerUser);
router.post('/login', User.login, Session.createSession)
router.get('/logout', User.logout)
module.exports = router