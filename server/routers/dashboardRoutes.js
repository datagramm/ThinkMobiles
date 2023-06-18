const express = require('express')
const router = express.Router()
const Dashboard = require('../controllers/dashboard/dashboard')
const Session = require('../middleware/validateSession')

router.use(Session.validateSession)

router.post('/getAllUsers', Dashboard.getAllUsers)
router.post('/pushUser', Dashboard.pushUser)
router.get('/getCurrentUserEvents', Dashboard.getCurrentUserEvents)
router.post('/pushEvent', Dashboard.pushEventDate)

module.exports = router