const router = require('express').Router()
const auth = require('../controllers/authController')

router.post('/', auth.register)
router.get('/', auth.getRegister)

module.exports = router