const express = require('express')
const router = express.Router()
const Dashboard = require('../controllers/dashboard/dashboard')
const Session = require('../middleware/validateSession')

router.use(Session.validateSession)

router.get('/getAllUsers', Dashboard.getAllUsers)
router.get('/getCurrentUserEvents', Dashboard.getCurrentUserEvents)
router.get('/user/:id', Dashboard.getCurrentUser)
router.post('/pushUser', Dashboard.pushUser)
router.post('/pushEvent', Dashboard.pushEventDate)

module.exports = router