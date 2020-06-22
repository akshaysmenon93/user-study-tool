const router = require('express').Router()
const auth = require('../controllers/authController')

router.get('/', auth.logout)

module.exports = router